/*
https://docs.nestjs.com/modules
*/
import { ContactRepository } from '@models/repositories/contact.repository';
import { OrderItemRepository } from '@models/repositories/order-item.repository';
import { OrderRepository } from '@models/repositories/order.repository';
import { ProductRepository } from '@models/repositories/product.repository';
import { UserRepository } from '@models/repositories/user.repository';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([
            OrderRepository,
            OrderItemRepository,
            UserRepository,
            ContactRepository,
            ProductRepository,
        ]),
    ],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule {}
