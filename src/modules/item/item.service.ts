import { ItemRepository } from '@models/repositories/item.responsitory';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateItemDto } from './dto/create-item.dto';
import { GetItemRequestDto, UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
    constructor(private readonly itemRepository: ItemRepository) {}

    async create(createItemDto: CreateItemDto) {
        const item = this.itemRepository.create(createItemDto);
        return await this.itemRepository.save(item);
    }

    async getAll(query: GetItemRequestDto) {
        const [result, metadata]: any = await this.itemRepository.getAll(query);
        return result.toPageDto(metadata);
    }

    async findOne(id: number) {
        const item = await this.itemRepository.findOne({
            where: { id },
            relations: ['product', 'itemAttributes'],
        });
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return item;
    }

    async update(id: number, updateItemDto: UpdateItemDto) {
        const item = await this.findOne(id);
        Object.assign(item, updateItemDto);
        return await this.itemRepository.save(item);
    }

    async remove(id: number) {
        await this.findOne(id);
        return await this.itemRepository.softDelete(id);
    }
}
