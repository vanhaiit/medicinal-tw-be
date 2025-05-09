import { ItemEntity } from '@models/entities/item.entity';
import { NotFoundException } from '@nestjs/common';

import { GetItemRequestDto } from '@modules/item/dto/update-item.dto';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(ItemEntity)
export class ItemRepository extends BaseRepository<ItemEntity> {
    async checkItemExist(id: number): Promise<void> {
        const item = await this.findOne({ where: { id } });
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
    }

    async getAll(options?: GetItemRequestDto) {
        const query = this.createQueryBuilder('items').leftJoinAndSelect(
            'items.itemAttributes',
            'attributes',
        ); // Changed from categories to category

        if (options?.search) {
            query.andWhere(`LOWER(items.title) LIKE LOWER(:search)`, {
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
