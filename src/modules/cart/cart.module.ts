import { CartRepository } from '@models/repositories/cart.repository';
import { ItemRepository } from '@models/repositories/item.responsitory';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([CartRepository, ItemRepository]),
    ],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule {}
