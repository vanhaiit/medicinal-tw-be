import { UserRepository } from '@models/repositories/user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from 'constant/http-error.constant';

import mapDto from '@shared/helpers/mapdto';

import {
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

    async createUser(body: UserRequestDto) {
        const payload = mapDto(body, UserRequestDto);
        return await this.userRepository.save(
            this.userRepository.create({
                ...payload,
            }),
        );
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
