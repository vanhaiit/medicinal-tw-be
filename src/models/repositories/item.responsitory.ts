import { ItemEntity } from '@models/entities/item.entity';
import { In } from 'typeorm';

import { GetItemRequestDto } from '@modules/item/dto/get-item.dto';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(ItemEntity)
export class ItemRepository extends BaseRepository<ItemEntity> {
    async checkItemExist(id: number): Promise<any> {
        const item = await this.findOne({ where: { id } });
        if (!item) {
            return id;
        }
        return;
    }

    async checkItemsExist(ids: number[]): Promise<any> {
        const items = await this.find({ where: { id: In(ids) } });

        if (items.length !== ids.length) {
            const missingIds = ids.filter(
                id => !items.some(item => item.id === id),
            );
            return missingIds;
        }

        return;
    }

    async getAll(options?: GetItemRequestDto) {
        const query = this.createQueryBuilder('items').leftJoinAndSelect(
            'items.itemAttributes',
            'attributes',
        ); // Changed from categories to category

        if (options?.search) {
            query.andWhere(`LOWER(items.name) LIKE LOWER(:search)`, {
                search: `%${options.search.toLowerCase()}%`,
            });
        }

        if (options?.orderBy) {
            query.orderBy(
                `items.${options.orderBy}`,
                options.direction || 'DESC',
            );
        }

        if (!!options) {
            return query.paginate(options);
        }

        return query.getMany();
    }
}
