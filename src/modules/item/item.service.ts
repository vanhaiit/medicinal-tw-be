import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ItemEntity } from '../../models/entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(ItemEntity)
        private readonly itemRepository: Repository<ItemEntity>,
    ) {}

    async create(createItemDto: CreateItemDto) {
        const item = this.itemRepository.create(createItemDto);
        return await this.itemRepository.save(item);
    }

    async findAll() {
        return await this.itemRepository.find({
            relations: ['product', 'itemAttributes'],
        });
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
