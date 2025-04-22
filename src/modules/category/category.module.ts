/*
https://docs.nestjs.com/modules
*/
import { CategoryRepository } from '@models/repositories/category.repository';
import { ProductCategoryRepository } from '@models/repositories/product-category.repository';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([
            CategoryRepository,
            ProductCategoryRepository,
        ]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
