import {
    EItemType,
    Estatus,
    EStockStatus,
    ETaxStatus,
} from 'constant/item.constant';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { ItemAttributeEntity } from './item-attribute.entity';
import { OrderItemEntity } from './order-item.entity';
import { ProductEntity } from './product.entity';

@Entity('items')
export class ItemEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({
        name: 'product_id',
        nullable: false,
        comment: 'Foreign key to the parent product',
    })
    productId: number;

    @ManyToOne(() => ProductEntity, product => product.items)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @Column({
        name: 'sku',
        nullable: true,
        unique: true,
        comment: 'Stock Keeping Unit for item identification',
    })
    sku: string;

    @Column({
        name: 'name',
        nullable: false,
        comment: 'Item name (e.g., "Quần size S màu xanh")',
    })
    name: string;

    @Column({
        name: 'slug',
        nullable: true,
        unique: true,
        comment: 'URL-friendly slug for SEO',
    })
    slug: string;

    @Column({
        name: 'description',
        type: 'text',
        nullable: true,
        comment: 'Detailed description of the item',
    })
    description: string;

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
        nullable: false,
        default: 0,
        comment: 'Available stock quantity',
    })
    stockQuantity: number;

    @Column({
        name: 'stock_status',
        nullable: false,
        default: EStockStatus.instock,
        comment: 'Stock status: instock, outofstock, onbackorder',
    })
    stockStatus: string;

    @Column({
        name: 'manage_stock',
        nullable: false,
        default: false,
        comment: 'Enable stock management for this item',
    })
    manageStock: boolean;

    @Column({
        name: 'weight',
        type: 'float',
        nullable: true,
        comment: 'Item weight (e.g., in kg)',
    })
    weight: number;

    @Column({
        name: 'length',
        type: 'float',
        nullable: true,
        comment: 'Item length (e.g., in cm)',
    })
    length: number;

    @Column({
        name: 'width',
        type: 'float',
        nullable: true,
        comment: 'Item width (e.g., in cm)',
    })
    width: number;

    @Column({
        name: 'height',
        type: 'float',
        nullable: true,
        comment: 'Item height (e.g., in cm)',
    })
    height: number;

    @Column({
        name: 'featured_image',
        nullable: true,
        comment: 'URL or path to the item-specific featured image',
    })
    featuredImage: string;

    @Column({
        name: 'gallery_images',
        type: 'jsonb',
        nullable: true,
        comment: 'List of URLs or paths to item-specific gallery images',
    })
    galleryImages: string[];

    @Column({
        name: 'type',
        nullable: false,
        default: EItemType.physical,
        comment: 'Item type: physical, digital, service',
    })
    type: string;

    @Column({
        name: 'status',
        nullable: false,
        default: Estatus.publish,
        comment: 'Item status: publish, draft, disabled',
    })
    status: string;

    @Column({
        name: 'is_active',
        nullable: false,
        default: true,
        comment: 'Whether the item is available for purchase',
    })
    isActive: boolean;

    @Column({
        name: 'meta_title',
        nullable: true,
        comment: 'SEO meta title for the item',
    })
    metaTitle: string;

    @Column({
        name: 'meta_description',
        type: 'text',
        nullable: true,
        comment: 'SEO meta description for the item',
    })
    metaDescription: string;

    @Column({
        name: 'tax_status',
        nullable: false,
        default: ETaxStatus.none,
        comment: 'Tax status: taxable, shipping, none',
    })
    taxStatus: string;

    @Column({
        name: 'tax_class',
        nullable: true,
        comment: 'Tax class for the item',
    })
    taxClass: string;

    @Column({
        name: 'average_rating',
        type: 'float',
        nullable: true,
        default: 0,
        comment: 'Average rating based on reviews',
    })
    averageRating: number;

    @Column({
        name: 'review_count',
        nullable: true,
        default: 0,
        comment: 'Number of reviews for the item',
    })
    reviewCount: number;

    @Column({
        name: 'index',
        nullable: true,
        comment: 'Sort order for display',
    })
    index: number;

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

    @OneToMany(() => ItemAttributeEntity, itemAttribute => itemAttribute.item)
    itemAttributes: ItemAttributeEntity[];

    @OneToMany(() => OrderItemEntity, orderItem => orderItem.item)
    orderItems: OrderItemEntity[];
}
