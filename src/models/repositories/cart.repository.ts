import { CartEntity } from '@models/entities/cart.entity';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(CartEntity)
export class CartRepository extends BaseRepository<CartEntity> {
    async removeFromCart(userId: number, itemIds: number[]) {
        const qb = this.createQueryBuilder()
            .delete()
            .where('user_id = :userId', { userId })
            .andWhere('item_id IN (:...itemIds)', { itemIds });
        return await qb.execute();
    }
}
