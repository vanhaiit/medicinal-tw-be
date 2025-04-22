import { ProductAttributeEntity } from '@models/entities/product-attribute.entity';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(ProductAttributeEntity)
export class ProductAttributeRepository extends BaseRepository<ProductAttributeEntity> {
    async checkAttributesExist(attributeIds: number[]): Promise<boolean> {
        if (!attributeIds?.length) return true;

        const attributes = await this.createQueryBuilder('attribute')
            .where('attribute.id IN (:...ids)', { ids: attributeIds })
            .getMany();

        return attributes.length === attributeIds.length;
    }
}
