/*
https://docs.nestjs.com/modules
*/
import { AttributeValueRepository } from '@models/repositories/attribute-value.repository';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { AttributeValueController } from './attribute-value.controller';
import { AttributeValueService } from './attribute-value.service';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([AttributeValueRepository])],
    controllers: [AttributeValueController],
    providers: [AttributeValueService],
})
export class AttributeValueModule {}
