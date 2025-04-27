/*
https://docs.nestjs.com/modules
*/
import { VoucherRepository } from '@models/repositories/voucher.repositoty';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([VoucherRepository])],
    controllers: [VoucherController],
    providers: [VoucherService],
})
export class VoucherModule {}
