import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';
import { VnPayController } from './vnpay.controller';
import { VnPayService } from './vnpay.service';
import { OrderRepository } from '@models/repositories/order.repository';


@Module({
    imports: [TypeOrmExModule.forCustomRepository([OrderRepository])],
    controllers: [VnPayController],
    providers: [VnPayService],
})
export class VnPaytModule {}
