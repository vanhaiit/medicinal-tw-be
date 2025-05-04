import { EItemStatus, EItemType, EStockStatus, ETaxStatus } from "constant/item.constant";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitItem1744646846098 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'items',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        isUnique: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'product_id',
                        type: 'integer',
                        isNullable: false,
                        comment: 'Foreign key to the parent product',
                    },
                    {
                        name: 'sku',
                        type: 'varchar',
                        isNullable: true,
                        isUnique: true,
                        comment: 'Stock Keeping Unit for item identification',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                        comment: 'Item name (e.g., "Quần size S màu xanh")',
                    },
                    {
                        name: 'slug',
                        type: 'varchar',
                        isNullable: true,
                        isUnique: true,
                        comment: 'URL-friendly slug for SEO',
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                        comment: 'Detailed description of the item',
                    },
                    {
                        name: 'regular_price',
                        type: 'float',
                        isNullable: false,
                        default: 0,
                        comment: 'Regular price of the item',
                    },
                    {
                        name: 'sale_price',
                        type: 'float',
                        isNullable: true,
                        comment: 'Sale price of the item (if on sale)',
                    },
                    {
                        name: 'stock_quantity',
                        type: 'integer',
                        isNullable: false,
                        default: 0,
                        comment: 'Available stock quantity',
                    },
                    {
                        name: 'stock_status',
                        type: 'varchar',
                        isNullable: false,
                        default: `'${EStockStatus.instock}'`,
                        comment: 'Stock status: instock, outofstock, onbackorder',
                    },
                    {
                        name: 'manage_stock',
                        type: 'boolean',
                        isNullable: false,
                        default: false,
                        comment: 'Enable stock management for this item',
                    },
                    {
                        name: 'weight',
                        type: 'float',
                        isNullable: true,
                        comment: 'Item weight (e.g., in kg)',
                    },
                    {
                        name: 'length',
                        type: 'float',
                        isNullable: true,
                        comment: 'Item length (e.g., in cm)',
                    },
                    {
                        name: 'width',
                        type: 'float',
                        isNullable: true,
                        comment: 'Item width (e.g., in cm)',
                    },
                    {
                        name: 'height',
                        type: 'float',
                        isNullable: true,
                        comment: 'Item height (e.g., in cm)',
                    },
                    {
                        name: 'featured_image',
                        type: 'varchar',
                        isNullable: true,
                        comment: 'URL or path to the item-specific featured image',
                    },
                    {
                        name: 'gallery_images',
                        type: 'jsonb',
                        isNullable: true,
                        comment: 'List of URLs or paths to item-specific gallery images',
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: false,
                        default: `'${EItemType.physical}'`,
                        comment: 'Item type: physical, digital, service',
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: false,
                        default: `'${EItemStatus.publish}'`,
                        comment: 'Item status: publish, draft, disabled',
                    },
                    {
                        name: 'is_active',
                        type: 'boolean',
                        isNullable: false,
                        default: true,
                        comment: 'Whether the item is available for purchase',
                    },
                    {
                        name: 'meta_title',
                        type: 'varchar',
                        isNullable: true,
                        comment: 'SEO meta title for the item',
                    },
                    {
                        name: 'meta_description',
                        type: 'text',
                        isNullable: true,
                        comment: 'SEO meta description for the item',
                    },
                    {
                        name: 'tax_status',
                        type: 'varchar',
                        isNullable: false,
                        default: `'${ETaxStatus.none}'`,
                        comment: 'Tax status: taxable, shipping, none',
                    },
                    {
                        name: 'tax_class',
                        type: 'varchar',
                        isNullable: true,
                        comment: 'Tax class for the item',
                    },
                    {
                        name: 'average_rating',
                        type: 'float',
                        isNullable: true,
                        default: 0,
                        comment: 'Average rating based on reviews',
                    },
                    {
                        name: 'review_count',
                        type: 'integer',
                        isNullable: true,
                        default: 0,
                        comment: 'Number of reviews for the item',
                    },
                    {
                        name: 'index',
                        type: 'integer',
                        isNullable: true,
                        comment: 'Sort order for display',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('item');
    }

}
