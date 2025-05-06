import { UserEntity } from '@models/entities/user.entity';
import { SortOrder } from 'constant/pagination.constant';

import { GetUserRequestDto } from '@modules/users/dto/user.req.dto';

// You'll need to create this DTO
import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

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

    async getAll(options?: GetUserRequestDto) {
        const query = this.createQueryBuilder('user')
            .select([
                'user.id as userId',
                'user.username as userName',
                'user.email as email',
                'user.phone as phone',
                'user.bod as bod',
                'user.isLocked as isLocked',
                'user.status as status',
                'user.description as description',
                'user.createdAt as createdAt',
                'user.updatedAt as updatedAt',
                'profile.fullName as fullName',
                'profile.avatar as avatar',
                'profile.full_name as full_name',
                'profile.gender as gender',
                'profile.birthday as birthday',
                'profile.phone as profilePhone',
                'profile.address as address',
                'profile.avatar as profileAvatar',
                'profile.updatedAt as profileUpdatedAt',
                'profile.createdAt as profileCreatedAt',
            ])
            .leftJoin('user.profile', 'profile');

        if (options?.search) {
            query.andWhere(
                `(LOWER(user.email) LIKE LOWER(:search) OR 
                  LOWER(profile.fullName) LIKE LOWER(:search)`,
                {
                    search: `%${options.search.toLowerCase()}%`,
                },
            );
        }

        if (options?.orderBy) {
            query.orderBy(
                `products.${options.orderBy}`,
                options.direction || SortOrder.DESC,
            );
        }

        if (!!options) {
            const { limit, page, skip } = options;
            const pageOption = { page, limit, skip } as PageOptionsDto;
            return await query.paginateRaw(pageOption);
        }

        return await query.getRawMany();
    }

    async getUserById(id: number): Promise<UserEntity> {
        const query = this.createQueryBuilder('user')
            .select([
                'user.id as userId',
                'user.username as userName',
                'user.email as email',
                'user.phone as phone',
                'user.bod as bod',
                'user.isLocked as isLocked',
                'user.status as status',
                'user.description as description',
                'user.createdAt as createdAt',
                'user.updatedAt as updatedAt',
                'profile.fullName as fullName',
                'profile.avatar as avatar',
                'profile.full_name as full_name',
                'profile.gender as gender',
                'profile.birthday as birthday',
                'profile.phone as profilePhone',
                'profile.address as address',
                'profile.avatar as profileAvatar',
                'profile.updatedAt as profileUpdatedAt',
                'profile.createdAt as profileCreatedAt',
            ])
            .where('user.id = :id', { id })
            .leftJoin('user.profile', 'profile');
        return query.getRawOne();
    }
}
