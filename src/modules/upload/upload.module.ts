/*
https://docs.nestjs.com/modules
*/
import { FinderRepository } from '@models/repositories/finder.responsitoy';
import { UploadRepository } from '@models/repositories/upload.repository';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';

import { FinderService } from '@modules/finder/finder.service';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
    imports: [
        MulterModule.register({
            storage: multer.memoryStorage(),
        }),
        TypeOrmExModule.forCustomRepository([
            UploadRepository,
            FinderRepository,
        ]),
    ],
    controllers: [UploadController],
    providers: [UploadService, FinderService],
})
export class UploadModule {}
