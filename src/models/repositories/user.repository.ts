import { UserEntity } from '@models/entities/user.entity';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
    async getUserWithRoles(userId: string): Promise<UserEntity> {
        const query = this.createQueryBuilder('user')
            .leftJoinAndSelect('user.userRoles', 'userRole')
            .leftJoinAndSelect('userRole.role', 'role')
            .leftJoinAndSelect('role.rolePermissions', 'rolePermission')
            .leftJoinAndSelect('rolePermission.permission', 'permission');
        if (isNaN(Number(userId))) {
            query.where('user.email = :email', { email: userId });
        } else {
            query.where('user.id = :userId', { userId });
        }
        return query.getOne();
    }
}
