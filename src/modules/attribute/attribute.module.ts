/*
https://docs.nestjs.com/modules
*/
import { AttributeRepository } from '@models/repositories/attribute.repository';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { AttributeController } from './attribute.controller';
import { AttributeService } from './attribute.service';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([AttributeRepository])],
    controllers: [AttributeController],
    providers: [AttributeService],
})
export class AttributeModule {}
