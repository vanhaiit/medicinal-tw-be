import { CommentEntity } from '@models/entities/comment.entity';
import { ProductEntity } from '@models/entities/product.entity';
import { WishlistEntity } from '@models/entities/wishlist.entity';
import { SortOrder } from 'constant/pagination.constant';

import { GetProductRequestDto } from '@modules/product/dtos/product.req.dto';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

import { BaseRepository } from './base.repository';

@CustomRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> {
    async getAll(options?: GetProductRequestDto, userId?: number) {
        const query = this.createQueryBuilder('products')
            .select([
                'products.id AS "id"',
                'products.name AS "name"',
                'products.slug AS "slug"',
                'products.sku AS "sku"',
                'products.description AS "description"',
                'products.shortDescription AS "shortDescription"',
                'products.status AS "status"',
                'products.isVisible AS "isVisible"',
                'products.isFeatured AS "isFeatured"',
                'products.featuredImage AS "featuredImage"',
                'products.galleryImages AS "galleryImages"',
                'products.tags AS "tags"',
                'products.metaTitle AS "metaTitle"',
                'products.metaDescription AS "metaDescription"',
                'products.reviewsAllowed AS "reviewsAllowed"',
                'products.averageRating AS "averageRating"',
                'products.reviewCount AS "reviewCount"',
                'products.relatedProducts AS "relatedProducts"',
                'products.index AS "index"',
                'products.regularPrice AS "regularPrice"',
                'products.salePrice AS "salePrice"',
                'products.stockQuantity AS "stockQuantity"',
                'products.stockStatus AS "stockStatus"',
                'products.brand AS "brand"',
                'products.flashSale AS "flashSale"',
                'products.bestSeller AS "bestSeller"',
                'products.isActive AS "isActive"',
                'COALESCE(AVG(NULLIF(comments.rating, 0)), 0) AS "avgRating"',
                `jsonb_agg(jsonb_build_object('name', categories.name, 'id', categories.id)) AS "categories"`,
                `jsonb_agg(
                    jsonb_build_object(
                        'id', items.id,
                        'sku', items.sku,
                        'name', items.name,
                        'slug', items.slug,
                        'regularPrice', items.regularPrice,
                        'salePrice', items.salePrice,
                        'stockQuantity', items.stockQuantity,
                        'stockStatus', items.stockStatus,
                        'featuredImage', items.featuredImage,
                        'galleryImages', items.galleryImages,
                        'type', items.type,
                        'status', items.status,
                        'isActive', items.isActive,
                        'index', items.index
                    )
                ) AS "items"`,
            ])
            .leftJoin(
                CommentEntity,
                'comments',
                'comments.productId = products.id AND comments.deletedAt IS NULL',
            )
            .leftJoin(
                'products.productAttributes',
                'productAttributes',
                'productAttributes.deletedAt IS NULL',
            )
            .leftJoin('products.items', 'items', 'items.deletedAt IS NULL')
            .leftJoin(
                'products.categories',
                'categories',
                'categories.deletedAt IS NULL',
            )
            .leftJoin(
                'productAttributes.attribute',
                'attribute',
                'attribute.deletedAt IS NULL',
            )
            .andWhere('products.deletedAt IS NULL');

        if (userId) {
            query
                .leftJoin(
                    WishlistEntity,
                    'wishlist',
                    'wishlist.productId = products.id AND wishlist.userId = :userId',
                    { userId },
                )
                .addSelect(
                    `BOOL_OR(wishlist.productId IS NOT NULL) AS isLiked`,
                );
        }

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

        if (options?.minPrice !== undefined) {
            query.andWhere('products.salePrice >= :minPrice', {
                minPrice: options.minPrice,
            });
        }

        if (options?.maxPrice !== undefined) {
            query.andWhere('products.salePrice <= :maxPrice', {
                maxPrice: options.maxPrice,
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
        query.groupBy('products.id');

        if (options?.orderBy) {
            query.orderBy(
                `products.${options.orderBy}`,
                options.direction || SortOrder.DESC,
            );
        }

        if (!!options) {
            const { limit, page, skip } = options;
            const pageOption = { page, limit, skip } as PageOptionsDto;
            return await query.paginateRaw(pageOption);
        }

        return await query.getRawMany();
    }

    async checkProductExist(id: number): Promise<boolean> {
        const product = await this.findOne({
            where: {
                id,
            },
        });

        return !!product?.id;
    }

    async getDetail(
        id?: number,
        slug?: string,
        userId?: number,
    ): Promise<ProductEntity> {
        const query = this.createQueryBuilder('products')
            .select([
                'products.id AS "id"',
                'products.name AS "name"',
                'products.slug AS "slug"',
                'products.sku AS "sku"',
                'products.description AS "description"',
                'products.shortDescription AS "shortDescription"',
                'products.status AS "status"',
                'products.isVisible AS "isVisible"',
                'products.isFeatured AS "isFeatured"',
                'products.featuredImage AS "featuredImage"',
                'products.galleryImages AS "galleryImages"',
                'products.tags AS "tags"',
                'products.metaTitle AS "metaTitle"',
                'products.metaDescription AS "metaDescription"',
                'products.reviewsAllowed AS "reviewsAllowed"',
                'products.reviewCount AS "reviewCount"',
                'products.relatedProducts AS "relatedProducts"',
                'products.index AS "index"',
                'products.regularPrice AS "regularPrice"',
                'products.salePrice AS "salePrice"',
                'products.stockQuantity AS "stockQuantity"',
                'products.stockStatus AS "stockStatus"',
                'products.brand AS "brand"',
                'products.flashSale AS "flashSale"',
                'products.bestSeller AS "bestSeller"',
                'products.isActive AS "isActive"',
                'COUNT(DISTINCT comments.id) AS "commentCount"',
                'COALESCE(AVG(NULLIF(comments.rating, 0)), 0) AS "avgRating"',
                `jsonb_agg(jsonb_build_object('name', categories.name, 'id', categories.id)) AS "categories"`,
                `jsonb_agg(jsonb_build_object('name', attribute.name, 'id', attribute.id)) AS "attributes"`,
                `jsonb_agg(
                    jsonb_build_object(
                        'id', items.id,
                        'sku', items.sku,
                        'name', items.name,
                        'slug', items.slug,
                        'regularPrice', items.regularPrice,
                        'salePrice', items.salePrice,
                        'stockQuantity', items.stockQuantity,
                        'stockStatus', items.stockStatus,
                        'featuredImage', items.featuredImage,
                        'galleryImages', items.galleryImages,
                        'type', items.type,
                        'status', items.status,
                        'isActive', items.isActive,
                        'index', items.index,
                        'itemAttributes', (
                            SELECT jsonb_agg(
                                jsonb_build_object(
                                    'id', ia.id,
                                    'itemId', ia.item_id,
                                    'attributeValueId', ia.attribute_value_id,
                                    'index', ia.index,
                                    'attributeValue', jsonb_build_object(
                                        'id', av.id,
                                        'attributeId', av.attribute_id,
                                        'value', av.value,
                                        'index', av.index,
                                        'image', av.image
                                    )
                                )
                            )
                            FROM item_attributes ia
                            LEFT JOIN attribute_values av ON av.id = ia.attribute_value_id
                            WHERE ia.item_id = items.id AND ia.deleted_at IS NULL
                        )
                    )
                ) AS "items"`,
            ])
            .leftJoin(
                CommentEntity,
                'comments',
                'comments.productId = products.id AND comments.deletedAt IS NULL',
            )
            .leftJoin(
                'products.productAttributes',
                'productAttributes',
                'productAttributes.deletedAt IS NULL',
            )
            .leftJoin('products.items', 'items', 'items.deletedAt IS NULL')
            .leftJoin(
                'products.categories',
                'categories',
                'categories.deletedAt IS NULL',
            )
            .leftJoin(
                'productAttributes.attribute',
                'attribute',
                'attribute.deletedAt IS NULL',
            )
            .andWhere('products.deletedAt IS NULL')
            .andWhere('products.isActive = true')
            .andWhere('products.isVisible = true')
            .andWhere('products.slug = :slug', { slug })
            .orWhere('products.id = :id', { id })
            .groupBy('products.id');
        if (userId) {
            query
                .leftJoin(
                    WishlistEntity,
                    'wishlist',
                    'wishlist.productId = products.id AND wishlist.userId = :userId',
                    { userId },
                )
                .addSelect(
                    `BOOL_OR(wishlist.productId IS NOT NULL) AS isLiked`,
                );
        }
        return await query.getRawOne();
    }
}
