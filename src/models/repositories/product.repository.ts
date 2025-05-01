import { ProductEntity } from '@models/entities/product.entity';
import { SortOrder } from 'constant/pagination.constant';

import { GetProductRequestDto } from '@modules/product/dtos/product.req.dto';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

import { BaseRepository } from './base.repository';

@CustomRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> {
    async getAll(options?: GetProductRequestDto) {
        const query = this.createQueryBuilder('products')
            .leftJoinAndSelect(
                'products.productAttributes',
                'productAttributes',
            )
            .leftJoinAndSelect('products.categories', 'categories')
            .leftJoinAndSelect('productAttributes.attribute', 'attribute')
            .leftJoinAndSelect('products.items', 'items')
            .leftJoinAndSelect('items.itemAttributes', 'itemAttributes')
            .leftJoinAndSelect(
                'itemAttributes.attributeValue',
                'attributeValue',
            );

        if (options?.search) {
            query.andWhere(`LOWER(products.name) LIKE LOWER(:search)`, {
                search: `%${options.search.toLowerCase()}%`,
            });
        }

        if (options?.isActive !== undefined) {
            query.andWhere('products.isActive = :isActive', {
                isActive: options.isActive,
            });
        }
        if (options?.flashSale !== undefined) {
            query.andWhere('products.flashSale = :flashSale', {
                flashSale: options.flashSale,
            });
        }
        if (options?.bestSeller !== undefined) {
            query.andWhere('products.bestSeller = :bestSeller', {
                bestSeller: options.bestSeller,
            });
        }

        if (options?.categoryIds && options.categoryIds.length > 0) {
            const integerCategoryIds = options.categoryIds.map(id =>
                parseInt(String(id), 10),
            );
            query.andWhere('categories.id IN (:...categoryIds)', {
                categoryIds: integerCategoryIds,
            });
        }

        if (options?.itemAttributeIDs && options.itemAttributeIDs.length > 0) {
            query.andWhere(
                'itemAttributes.attribute_value_id IN (:...itemAttributeIDs)',
                {
                    itemAttributeIDs: options.itemAttributeIDs,
                },
            );
        }

        if (options?.orderBy) {
            query.orderBy(
                `products.${options.orderBy}`,
                options.direction || SortOrder.DESC,
            );
        }

        if (!!options) {
            const { limit, page, skip } = options;
            const pageOption = { page, limit, skip } as PageOptionsDto;
            return query.paginate(pageOption);
        }

        return query.getMany();
    }

    async checkProductExist(id: number): Promise<boolean> {
        const product = await this.findOne({
            where: {
                id,
            },
        });

        return !!product?.id;
    }
}
