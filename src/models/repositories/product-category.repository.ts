import { ProductCategoryEntity } from '@models/entities/product-category.entity';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(ProductCategoryEntity)
export class ProductCategoryRepository extends BaseRepository<ProductCategoryEntity> {}
