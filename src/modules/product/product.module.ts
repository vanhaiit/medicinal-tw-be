/*
https://docs.nestjs.com/modules
*/
import { AttributeRepository } from '@models/repositories/attribute.repository';
import { CategoryRepository } from '@models/repositories/category.repository';
import { CommentRepository } from '@models/repositories/comment.repository';
import { ItemAttributeRepository } from '@models/repositories/item-attribute.responsitory';
import { ItemRepository } from '@models/repositories/item.responsitory';
import { ProductAttributeRepository } from '@models/repositories/product-attribute.repository';
import { ProductCategoryRepository } from '@models/repositories/product-category.repository';
import { ProductRepository } from '@models/repositories/product.repository';
import { WishlistRepository } from '@models/repositories/wishlist.repository';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([
            ProductRepository,
            ItemRepository,
            ProductAttributeRepository,
            ItemAttributeRepository,
            ProductCategoryRepository,
            CategoryRepository,
            AttributeRepository,
            CommentRepository,
            WishlistRepository,
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
