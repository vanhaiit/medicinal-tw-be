import { FinderRepository } from '@models/repositories/finder.responsitoy';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { FinderController } from './finder.controller';
import { FinderService } from './finder.service';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([FinderRepository])],
    controllers: [FinderController],
    providers: [FinderService],
})
export class FinderModule {}
