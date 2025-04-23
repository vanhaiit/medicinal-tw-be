/*
https://docs.nestjs.com/modules
*/
import { PageDetailRepository } from '@models/repositories/page-detail.repository';
import { PageRepository } from '@models/repositories/page.repository';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([
            PageRepository,
            PageDetailRepository,
        ]),
    ],
    controllers: [PageController],
    providers: [PageService],
})
export class PageModule {}
