import { EStockStatus } from 'constant/item.constant';
import { EStatus } from 'constant/product.constant';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { CategoryEntity } from './category.entity';
import { ItemEntity } from './item.entity';
import { ProductAttributeEntity } from './product-attribute.entity';

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({
        name: 'name',
        nullable: false,
        comment: 'Product name (e.g., "Quần")',
    })
    name: string;

    @Column({
        name: 'slug',
        nullable: false,
        unique: true,
        comment: 'URL-friendly slug for SEO',
    })
    slug: string;

    @Column({
        name: 'sku',
        nullable: true,
        unique: true,
        comment: 'Optional SKU for the product',
    })
    sku: string;

    @Column({
        name: 'description',
        type: 'text',
        nullable: true,
        comment: 'Detailed product description',
    })
    description: string;

    @Column({
        name: 'short_description',
        type: 'text',
        nullable: true,
        comment: 'Short product description for summaries',
    })
    shortDescription: string;

    @Column({
        name: 'status',
        nullable: false,
        default: EStatus.draft,
        comment: 'Product status: publish, draft, pending, private',
    })
    status: string;

    @Column({
        name: 'is_visible',
        nullable: false,
        default: true,
        comment: 'Whether the product is visible on the frontend',
    })
    isVisible: boolean;

    @Column({
        name: 'is_active',
        nullable: false,
        default: true,
        comment: 'active product',
    })
    isActive: boolean;

    @Column({
        name: 'is_featured',
        nullable: false,
        default: false,
        comment: 'Whether the product is marked as featured',
    })
    isFeatured: boolean;

    @Column({
        name: 'featured_image',
        nullable: true,
        comment: 'URL or path to the featured image',
    })
    featuredImage: string;

    @Column({
        name: 'gallery_images',
        type: 'jsonb',
        nullable: true,
        comment: 'List of URLs or paths to gallery images',
    })
    galleryImages: string[];

    @Column({
        name: 'attribute_value_ids',
        type: 'jsonb',
        nullable: true,
        comment: 'List of tag IDs or tag names',
    })
    attributeValueIds: number[];

    @Column({
        name: 'tags',
        type: 'jsonb',
        nullable: true,
        comment: 'List of tag IDs or tag names',
    })
    tags: string[];

    @Column({
        name: 'meta_title',
        nullable: true,
        comment: 'SEO meta title',
    })
    metaTitle: string;

    @Column({
        name: 'meta_description',
        type: 'text',
        nullable: true,
        comment: 'SEO meta description',
    })
    metaDescription: string;

    @Column({
        name: 'reviews_allowed',
        nullable: false,
        default: true,
        comment: 'Whether reviews are allowed for this product',
    })
    reviewsAllowed: boolean;

    @Column({
        name: 'average_rating',
        type: 'float',
        nullable: true,
        default: 0,
        comment: 'Average rating based on item reviews',
    })
    averageRating: number;

    @Column({
        name: 'review_count',
        nullable: true,
        default: 0,
        comment: 'Total number of reviews for all items',
    })
    reviewCount: number;

    @Column({
        name: 'related_products',
        type: 'jsonb',
        nullable: true,
        comment: 'List of related product IDs',
    })
    relatedProducts: number[];

    @Column({
        name: 'index',
        nullable: true,
        comment: 'Sort order for display',
    })
    index: number;

    @Column({
        name: 'regular_price',
        type: 'float',
        nullable: false,
        default: 0,
        comment: 'Regular price of the item',
    })
    regularPrice: number;

    @Column({
        name: 'sale_price',
        type: 'float',
        nullable: true,
        comment: 'Sale price of the item (if on sale)',
    })
    salePrice: number;

    @Column({
        name: 'stock_quantity',
        type: 'integer',
        nullable: false,
        default: 0,
        comment: 'Available stock quantity',
    })
    stockQuantity: number;

    @Column({
        name: 'stock_status',
        type: 'varchar',
        nullable: false,
        default: EStockStatus.instock,
        comment: 'Stock status: instock, outofstock, onbackorder',
    })
    stockStatus: string;

    @Column({
        name: 'brand',
        type: 'varchar',
        nullable: true,
        comment: 'brand name of the product',
    })
    brand: string;

    @Column({
        name: 'flash_sale',
        nullable: false,
        default: false,
        comment: 'Enable flash sale',
    })
    flashSale: boolean;

    @Column({
        name: 'best_seller',
        nullable: false,
        default: false,
        comment: 'Enable bestSeller',
    })
    bestSeller: boolean;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
    })
    deletedAt: Date;

    // Relationship: One Product has many Items
    @OneToMany(() => ItemEntity, item => item.product)
    items: ItemEntity[];

    // Relationship: One Product has many ProductAttributes
    @OneToMany(
        () => ProductAttributeEntity,
        productAttribute => productAttribute.product,
    )
    productAttributes: ProductAttributeEntity[];

    // Relationship: ManyToMany with Category
    @ManyToMany(() => CategoryEntity, category => category.products)
    categories: CategoryEntity[];
}
