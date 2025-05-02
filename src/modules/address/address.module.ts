import { AddressRepository } from '@models/repositories/address.repository';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([AddressRepository])],
    controllers: [AddressController],
    providers: [AddressService],
})
export class AddressModule {}
