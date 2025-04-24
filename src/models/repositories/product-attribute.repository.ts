import { ProductAttributeEntity } from '@models/entities/product-attribute.entity';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(ProductAttributeEntity)
export class ProductAttributeRepository extends BaseRepository<ProductAttributeEntity> {}
