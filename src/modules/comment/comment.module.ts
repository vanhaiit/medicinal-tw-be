/*
https://docs.nestjs.com/modules
*/
import { CommentRepository } from '@models/repositories/comment.repository';
import { ProductCategoryRepository } from '@models/repositories/product-category.repository';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([
            CommentRepository,
            ProductCategoryRepository,
        ]),
    ],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule {}
