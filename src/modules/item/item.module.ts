import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemEntity } from '../../models/entities/item.entity';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
    imports: [TypeOrmModule.forFeature([ItemEntity])],
    controllers: [ItemController],
    providers: [ItemService],
    exports: [ItemService],
})
export class ItemModule {}
