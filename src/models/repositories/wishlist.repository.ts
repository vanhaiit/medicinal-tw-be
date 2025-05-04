import { WishlistEntity } from '@models/entities/wishlist.entity';

import { GetWishlistRequestDto } from '@modules/wishlist/dto/wishlist.req.dto';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(WishlistEntity)
export class WishlistRepository extends BaseRepository<WishlistEntity> {
    async getAll(userId: number, options?: GetWishlistRequestDto) {
        const query = this.createQueryBuilder('wishlist')
            .leftJoinAndSelect('wishlist.user', 'user')
            .leftJoinAndSelect('wishlist.product', 'product');

        if (options?.search) {
            query.andWhere(`LOWER(wishlist.product.name) LIKE LOWER(:search)`, {
                search: `%${options.search.toLowerCase()}%`,
            });
        }

        if (userId) {
            query.andWhere('wishlist.user_id = :userId', {
                userId,
            });
        }

        if (options?.orderBy) {
            query.orderBy(
                `wishlist.${options.orderBy}`,
                options.direction || 'DESC',
            );
        }

        if (!!options) {
            return query.paginate(options);
        }

        return query.getMany();
    }
}
