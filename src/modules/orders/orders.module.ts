import { OrderItemRepository } from '@models/repositories/order-item.repository';
import { OrderRepository } from '@models/repositories/order.repository';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([
            OrderRepository,
            OrderItemRepository,
        ]),
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
