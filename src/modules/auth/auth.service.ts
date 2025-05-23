import { ProfileRepository } from '@models/repositories/profile.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
    JWT_ACCESS_TOKEN_TIMEOUT,
    JWT_REFRESH_TOKEN_TIMEOUT,
} from 'constant/auth.constant';
import { httpErrors } from 'constant/http-error.constant';
import { UserStatus } from 'constant/user.constant';
import { UserRepository } from 'models/repositories/user.repository';
import { Raw } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { CreateProfileDto } from '@modules/profile/dtos/create-profile.dto';

import { JwtPayloadDto } from '@shared/dtos/jwt-payload.dto';
import mapDto from '@shared/helpers/mapdto';
import { getRedisUserKey } from '@shared/utils/redis';

import {
    ChangePasswordRequestDto,
    LoginBodyRequestDto,
    SignUpRequestDto,
} from './dtos/auth.request.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly profileRepository: ProfileRepository, // @Inject('REDIS_CACHE_MANAGER') private readonly cacheManager: Cache,
    ) { }

    checkUserExist(email: string) {
        return this.userRepository.existsBy({
            email: Raw(alias => `LOWER(${alias}) = :email`, {
                email: email.toLowerCase(),
            }),
        });
    }

    async getUser(email: string) {
        const user = await this.userRepository.getUserWithRoles(email);
        if (!user) {
            throw new HttpException(
                httpErrors.USER_NOT_FOUND,
                HttpStatus.BAD_REQUEST,
            );
        }

        return user;
    }

    async createNewUser(data: SignUpRequestDto) {
        const { password, ...body } = data;
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        const newUser = await this.userRepository.save(
            this.userRepository.create({
                ...body,
                hash,
                salt,
            }),
        );
        return newUser;
    }

    @Transactional()
    async signUp(data: SignUpRequestDto) {
        const { email, code, phone } = data;

        const existPhone = await this.checkUserExist(email);

        if (existPhone) {
            throw new HttpException(
                httpErrors.USERNAME_EXISTED,
                HttpStatus.BAD_REQUEST,
            );
        }

        const ESMS_CHECK_URL = this.configService.get<string>('ESMS_CHECK_URL');
        const ESMS_API_KEY = this.configService.get<string>(
            'ESMS_API_KEY',
        )
        const ESMS_API_SECRET = this.configService.get<string>(
            'ESMS_API_SECRET',
        );

        const url = `${ESMS_CHECK_URL}?ApiKey=${ESMS_API_KEY}&SecretKey=${ESMS_API_SECRET}&Phone=${phone}&Code=${code}`;

        const response = await fetch(url);
        const sms = await response.json();

        if (sms?.CodeResult === "117") {
            throw new HttpException(
                httpErrors.CODE_INVALID,
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = await this.createNewUser(data);

        const payload = mapDto(
            { userId: user.id, phone: data.phone },
            CreateProfileDto,
        );

        const profile = this.profileRepository.create(payload);

        await this.profileRepository.save(profile);

        return user;
    }

    async login(data: LoginBodyRequestDto) {
        const user = await this.getUser(data.email);

        const hash = await bcrypt.hash(data.password, user.salt);

        if (hash !== user.hash) {
            throw new HttpException(
                httpErrors.PASSWORD_IS_CORRECT,
                HttpStatus.BAD_REQUEST,
            );
        }

        if (user.status === UserStatus.INACTIVE) {
            throw new HttpException(
                httpErrors.USER_INACTIVE,
                HttpStatus.BAD_REQUEST,
            );
        }

        const token = this.getToken({
            id: user.id,
            roles: user.userRoles,
            email: user.email,
        });

        const accessTokenPayload: JwtPayloadDto = this.jwtService.decode(
            token.accessToken,
        );

        const redisKey = getRedisUserKey(user.id, accessTokenPayload.iat);
        console.log('redisKey', redisKey);

        // await this.cacheManager.set(redisKey, token.accessToken, {
        //     ttl: JWT_ACCESS_TOKEN_TIMEOUT,
        // });

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            roles: user.userRoles,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
        };
    }

    async logout(user: JwtPayloadDto) {
        const redisKey = getRedisUserKey(user.id, user.iat);
        console.log('redisKey', redisKey);
        // await this.cacheManager.del(redisKey);
    }

    async changePassword(
        email: string,
        { newPassword, oldPassword }: ChangePasswordRequestDto,
    ) {
        const user = await this.getUser(email);
        if (!user) {
            throw new HttpException(
                httpErrors.USER_NOT_FOUND,
                HttpStatus.BAD_REQUEST,
            );
        }

        const isValid = await bcrypt.compare(oldPassword, user.hash);

        if (!isValid) {
            throw new HttpException(
                httpErrors.PASSWORD_IS_CORRECT,
                HttpStatus.BAD_REQUEST,
            );
        }

        const hash = await bcrypt.hash(newPassword, user.salt);
        user.hash = hash;
        await this.userRepository.save(user);
        return user;
    }

    async forgotPassword(email: string) {
        const user = await this.getUser(email);

        if (!user)
            throw new HttpException(
                httpErrors.USERNAME_EXISTED,
                HttpStatus.BAD_REQUEST,
            );
        const token = this.getToken({
            id: user.id,
            roles: user.userRoles,
            email: user.email,
        });

        const resetUrl = `${this.configService.get<string>(
            'FRONTEND_URL',
        )}/reset-password?token=${token?.accessToken}`;

        return { url: resetUrl };
    }

    async getOTP(phone: string) {

        const phoneRegex = /^(0|\+84)([3|5|7|8|9])([0-9]{8})$/;
        if (!phoneRegex.test(phone)) {
            throw new HttpException(
                'Invalid phone number format',
                HttpStatus.BAD_REQUEST
            );
        }

        const ESMS_URL = this.configService.get<string>('ESMS_URL');
        const ESMS_API_KEY = this.configService.get<string>(
            'ESMS_API_KEY',
        )
        const ESMS_API_SECRET = this.configService.get<string>(
            'ESMS_API_SECRET',
        );
        const ESMS_MSG = this.configService.get<string>('ESMS_MSG');

        const ESMS_BRANCH = this.configService.get<string>('ESMS_BRANCH');


        const url = `${ESMS_URL}?Phone=${phone}&ApiKey=${ESMS_API_KEY}&SecretKey=${ESMS_API_SECRET}&TimeAlive=2&Brandname=${ESMS_BRANCH}&Type=2&message=${ESMS_MSG}&IsNumber=1`

        const response = await fetch(url);

        if (!response.ok) {
            throw new HttpException('Failed to send OTP', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return await response.json();
    }

    private getToken(payload: Omit<JwtPayloadDto, 'iat' | 'exp'>) {
        const refreshTokenSecret = this.configService.get<string>(
            'JWT_REFRESH_SECRET_KEY',
        );
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: JWT_ACCESS_TOKEN_TIMEOUT,
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: refreshTokenSecret,
            expiresIn: JWT_REFRESH_TOKEN_TIMEOUT,
        });

        return { accessToken, refreshToken };
    }
}
