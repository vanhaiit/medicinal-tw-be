import { CartRepository } from '@models/repositories/cart.repository';
import { ItemRepository } from '@models/repositories/item.responsitory';
import { OrderItemRepository } from '@models/repositories/order-item.repository';
import { OrderRepository } from '@models/repositories/order.repository';
import { VoucherRepository } from '@models/repositories/voucher.repositoty';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([
            OrderRepository,
            OrderItemRepository,
            VoucherRepository,
            ItemRepository,
            CartRepository,
        ]),
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
