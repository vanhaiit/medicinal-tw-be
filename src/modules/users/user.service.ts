import { UserRepository } from '@models/repositories/user.repository';
import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { httpErrors } from 'constant/http-error.constant';
import { UserType } from 'constant/user.constant';

import mapDto from '@shared/helpers/mapdto';

import {
    CreateUserRequestDto,
    DeleteUserRequestDto,
    GetUserRequestDto,
    UserRequestDto,
} from './dto/user.req.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async getAllUsers(query: GetUserRequestDto) {
        const [result, metadata]: any = await this.userRepository.getAll(query);
        return result.toPageDto(metadata);
    }

    async findUserById(id: number) {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new HttpException(
                httpErrors.USER_NOT_FOUND,
                HttpStatus.BAD_REQUEST,
            );
        }
        return user;
    }

    async createUser(data: CreateUserRequestDto) {
        const existingUser = await this.userRepository.findOne({
            where: [{ email: data.email }, { username: data.username }],
        });

        if (existingUser) {
            throw new BadRequestException(
                'User with this email or username already exists',
            );
        }

        const payload = mapDto(data, CreateUserRequestDto);

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(payload.password, salt);
        const user = this.userRepository.create({
            ...data,
            hash,
            salt,
            type: UserType.employee,
        });

        return this.userRepository.save(user);
    }

    async updateUser(id: number, body: UserRequestDto) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        if (!user) {
            throw new HttpException(
                httpErrors.USER_NOT_FOUND,
                HttpStatus.BAD_REQUEST,
            );
        }
        const payload = mapDto(body, UserRequestDto);
        return await this.userRepository.save({
            ...user,
            ...payload,
        });
    }

    async deleteUsers(query: DeleteUserRequestDto) {
        return await this.userRepository.delete(query.ids);
    }
}
