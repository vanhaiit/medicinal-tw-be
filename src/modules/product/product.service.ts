/*
https://docs.nestjs.com/providers#services
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
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from 'constant/http-error.constant';
import { In } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import mapDto from '@shared/helpers/mapdto';

import {
    CreateProductReqDto,
    GetProductRequestDto,
    UpdateProductReqDto,
} from './dtos/product.req.dto';

@Injectable()
export class ProductService {
    constructor(
        private readonly itemRepository: ItemRepository,
        private readonly productRepository: ProductRepository,
        private readonly productCategoryRepository: ProductCategoryRepository,
        private readonly categoryRepository: CategoryRepository,
        private readonly itemAttributeRepository: ItemAttributeRepository,
        private readonly productAttributeRepository: ProductAttributeRepository,
        private readonly attributeRepository: AttributeRepository,
        private readonly commentRepository: CommentRepository,
        private readonly wishlistRepository: WishlistRepository,
    ) {}

    async checkProductExist(id: number) {
        const productExists = await this.productRepository.checkProductExist(
            id,
        );
        if (!productExists) {
            throw new HttpException(
                httpErrors.PRODUCT_DOES_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    @Transactional()
    async createProduct(body: CreateProductReqDto): Promise<any> {
        const { items, attributeIds, categoryIds, sku } = body;

        const existingSku = await this.productRepository.findOne({
            where: { sku },
        });
        if (existingSku) {
            throw new HttpException(
                httpErrors.PRODUCT_SKU_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }

        const payload = mapDto(body, CreateProductReqDto);

        const product = await this.productRepository.save(
            this.productRepository.create({
                ...payload,
            }),
        );

        if (!!categoryIds?.length) {
            // Check if all categories exist using repository method
            const allCategoriesExist =
                await this.categoryRepository.checkCategoriesExist(categoryIds);
            if (!allCategoriesExist) {
                throw new HttpException(
                    httpErrors.CATEGORY_NOT_EXIST,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const categoryItems = categoryIds.map(e => ({
                categoryId: e,
                productId: product.id,
            }));
            await this.productCategoryRepository.save(
                this.productCategoryRepository.create(categoryItems),
            );
        }

        if (!!attributeIds?.length) {
            // Check if all attributes exist using repository method
            const allAttributesExist =
                await this.attributeRepository.checkAttributesExist(
                    attributeIds,
                );
            if (!allAttributesExist) {
                throw new HttpException(
                    httpErrors.ATTRIBUTE_NOT_EXIST,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const attributeItems = attributeIds.map(e => ({
                attributeId: e,
                productId: product.id,
            }));
            await this.productAttributeRepository.save(
                this.productAttributeRepository.create(attributeItems),
            );
        }

        if (!!items?.length) {
            const skus = items.map(item => item.sku);
            const existingSku = await this.itemRepository.findOne({
                where: { sku: In(skus) },
            });
            if (existingSku) {
                throw new HttpException(
                    httpErrors.ITEM_SKU_EXIST,
                    HttpStatus.BAD_REQUEST,
                );
            }
            // Save items first
            const savedItems = await this.itemRepository.save(
                this.itemRepository.create(
                    items.map(item => ({
                        ...item,
                        productId: product.id,
                    })),
                ),
            );

            // Save item attributes
            for (const item of items) {
                if (item.attributeValueIds?.length) {
                    const itemAttributes = item.attributeValueIds.map(
                        attributeValueId => ({
                            itemId: savedItems.find(
                                savedItem => savedItem.sku === item.sku,
                            )?.id,
                            attributeValueId: attributeValueId,
                        }),
                    );
                    await this.itemAttributeRepository.save(
                        this.itemAttributeRepository.create(itemAttributes),
                    );
                }
            }
        }

        return product;
    }

    async getAllProduct(query: GetProductRequestDto, userId: number) {
        const [result, metadata]: any = await this.productRepository.getAll(
            query,
            userId,
        );
        return result.toPageDto(metadata);
    }

    async getDetail(id: string | number, userId?: number) {
        let condition: { id?: number; slug?: string } = {};
        if (typeof id === 'number' || !isNaN(Number(id))) {
            condition = { id: Number(id) };
        } else {
            condition = { slug: id };
        }

        const product = await this.productRepository.getDetail(
            condition.id,
            condition.slug,
            userId,
        );

        if (!product) {
            throw new HttpException(
                httpErrors.PRODUCT_DOES_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }

        return product;
    }

    @Transactional()
    async updateProduct(id: number, body: UpdateProductReqDto) {
        await this.checkProductExist(id);
        const { attributeIds, categoryIds, ...productData } = body;

        const payload = mapDto(productData, UpdateProductReqDto);
        await this.productRepository.update(id, payload);

        if (!!categoryIds?.length) {
            // Delete existing categories
            await this.productCategoryRepository.delete({ productId: id });

            // Check if all categories exist
            const allCategoriesExist =
                await this.categoryRepository.checkCategoriesExist(categoryIds);
            if (!allCategoriesExist) {
                throw new HttpException(
                    httpErrors.CATEGORY_NOT_EXIST,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const categoryItems = categoryIds.map(e => ({
                categoryId: e,
                productId: id,
            }));
            await this.productCategoryRepository.save(
                this.productCategoryRepository.create(categoryItems),
            );
        }

        if (!!attributeIds?.length) {
            // Delete existing attributes
            await this.productAttributeRepository.delete({ productId: id });

            // Check if all attributes exist
            const allAttributesExist =
                await this.attributeRepository.checkAttributesExist(
                    attributeIds,
                );
            if (!allAttributesExist) {
                throw new HttpException(
                    httpErrors.ATTRIBUTE_NOT_EXIST,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const attributeItems = attributeIds.map(e => ({
                attributeId: e,
                productId: id,
            }));
            await this.productAttributeRepository.save(
                this.productAttributeRepository.create(attributeItems),
            );
        }

        return this.getDetail(id);
    }

    @Transactional()
    async deleteProduct(id: number) {
        await this.checkProductExist(id);

        // Delete product categories
        await this.productCategoryRepository.delete({ productId: id });

        // Delete product attributes
        await this.productAttributeRepository.delete({ productId: id });

        // Delete items and their attributes
        const items = await this.itemRepository.find({
            where: { productId: id },
        });
        const itemIds = items.map(item => item.id);

        if (itemIds.length) {
            await this.itemAttributeRepository.delete({ itemId: In(itemIds) });
            await this.itemRepository.delete({ productId: id });
        }

        // Soft delete the product
        await this.productRepository.softDelete(id);

        return { message: 'Product deleted successfully' };
    }
}
