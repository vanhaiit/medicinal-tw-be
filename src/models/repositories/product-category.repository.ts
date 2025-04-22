import { ProductCategoryEntity } from '@models/entities/product-category.entity';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(ProductCategoryEntity)
export class ProductCategoryRepository extends BaseRepository<ProductCategoryEntity> {
    async checkCategoriesExist(categoryIds: number[]): Promise<boolean> {
        if (!categoryIds?.length) return true;

        const categories = await this.createQueryBuilder('category')
            .where('category.id IN (:...ids)', { ids: categoryIds })
            .getMany();

        return categories.length === categoryIds.length;
    }
}
