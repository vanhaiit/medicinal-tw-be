import { ItemRepository } from '@models/repositories/item.responsitory';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([ItemRepository])],
    controllers: [ItemController],
    providers: [ItemService],
    exports: [ItemService],
})
export class ItemModule {}
