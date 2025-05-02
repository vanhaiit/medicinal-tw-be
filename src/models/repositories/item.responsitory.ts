import { ItemEntity } from '@models/entities/item.entity';
import { NotFoundException } from '@nestjs/common';

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
}
