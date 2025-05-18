import { EStockStatus } from "constant/item.constant";
import { EStatus } from "constant/product.constant";
import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class InitProduct1744643886551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'products',
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
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                        comment: 'Product name (e.g., "Quần")',
                    },
                    {
                        name: 'slug',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true,
                        comment: 'URL-friendly slug for SEO',
                    },
                    {
                        name: 'sku',
                        type: 'varchar',
                        isNullable: true,
                        isUnique: true,
                        comment: 'Optional SKU for the product',
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                        comment: 'Detailed product description',
                    },
                    {
                        name: 'short_description',
                        type: 'text',
                        isNullable: true,
                        comment: 'Short product description for summaries',
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: false,
                        default: `'${EStatus.draft}'`,
                        comment: 'Product status: publish, draft, pending, private',
                    },
                    {
                        name: 'is_visible',
                        type: 'boolean',
                        isNullable: false,
                        default: true,
                        comment: 'Whether the product is visible on the frontend',
                    },
                    {
                        name: 'is_featured',
                        type: 'boolean',
                        isNullable: false,
                        default: false,
                        comment: 'Whether the product is marked as featured',
                    },
                    {
                        name: 'featured_image',
                        type: 'varchar',
                        isNullable: true,
                        comment: 'URL or path to the featured image',
                    },
                    {
                        name: 'gallery_images',
                        type: 'jsonb',
                        isNullable: true,
                        comment: 'List of URLs or paths to gallery images',
                    },
                    {
                        name: 'attribute_value_ids',
                        type: 'jsonb',
                        isNullable: true,
                        comment: 'List of attribute_value_ids',
                    },
                    {
                        name: 'tags',
                        type: 'jsonb',
                        isNullable: true,
                        comment: 'List of tag IDs or tag names',
                    },
                    {
                        name: 'meta_title',
                        type: 'varchar',
                        isNullable: true,
                        comment: 'SEO meta title',
                    },
                    {
                        name: 'meta_description',
                        type: 'text',
                        isNullable: true,
                        comment: 'SEO meta description',
                    },
                    {
                        name: 'reviews_allowed',
                        type: 'boolean',
                        isNullable: false,
                        default: true,
                        comment: 'Whether reviews are allowed for this product',
                    },
                    {
                        name: 'average_rating',
                        type: 'float',
                        isNullable: true,
                        default: 0,
                        comment: 'Average rating based on item reviews',
                    },
                    {
                        name: 'review_count',
                        type: 'integer',
                        isNullable: true,
                        default: 0,
                        comment: 'Total number of reviews for all items',
                    },
                    {
                        name: 'related_products',
                        type: 'jsonb',
                        isNullable: true,
                        comment: 'List of related product IDs',
                    },
                    {
                        name: 'index',
                        type: 'integer',
                        isNullable: true,
                        comment: 'Sort order for display',
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
                        name: 'brand',
                        type: 'varchar',
                        isNullable: true,
                        comment: 'brand name of the product',
                    },
                    {
                        name: 'flash_sale',
                        type: 'boolean',
                        isNullable: false,
                        default: false,
                        comment: 'enable flash sale',
                    },
                    {
                        name: 'best_seller',
                        type: 'boolean',
                        isNullable: false,
                        default: false,
                        comment: 'enable best seller',
                    },
                    {
                        name: 'is_active',
                        type: 'boolean',
                        isNullable: false,
                        default: true,
                        comment: 'Whether the item is available for purchase',
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

        // Add index for the "index" column
        await queryRunner.createIndex(
            'products',
            new TableIndex({
                name: 'IDX_PRODUCTS_INDEX',
                columnNames: ['index'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the index first
        await queryRunner.dropIndex('products', 'IDX_PRODUCTS_INDEX');
        await queryRunner.dropTable('products');
    }

}
