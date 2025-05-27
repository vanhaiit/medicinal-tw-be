import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';
import { VnPayController } from './vnpay.controller';
import { VnPayService } from './vnpay.service';


@Module({
    imports: [TypeOrmExModule.forCustomRepository([])],
    controllers: [VnPayController],
    providers: [VnPayService],
})
export class VnPaytModule {}
