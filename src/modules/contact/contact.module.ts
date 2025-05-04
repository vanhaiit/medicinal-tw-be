import { ContactRepository } from '@models/repositories/contact.repository';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([ContactRepository])],
    controllers: [ContactController],
    providers: [ContactService],
})
export class ContactModule {}
