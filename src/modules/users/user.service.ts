import { UserRepository } from '@models/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private readonly usersRepository: UserRepository) {}

    async findUserById(id: string) {
        const user = await this.usersRepository.getUserWithRoles(id);
        return { ...user };
    }
}
