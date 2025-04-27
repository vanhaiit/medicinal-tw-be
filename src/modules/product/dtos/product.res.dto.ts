import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsString, ValidateNested } from 'class-validator';
import { EStatus } from 'constant/product.constant';

// DTO for ProductAttribute (for response)
class ProductAttributeDto {
    @ApiProperty({ description: 'Attribute ID', example: 1 })
    @Expose()
    @IsInt()
    attributeId: number;

    @ApiProperty({ description: 'Attribute name', example: 'Màu sắc' })
    @Expose()
    @IsString()
    name: string;
}

// DTO for Category (for response)
class CategoryDto {
    @ApiProperty({ description: 'Category ID', example: 1 })
    @Expose()
    @IsInt()
    id: number;

    @ApiProperty({ description: 'Category name', example: 'Quần áo' })
    @Expose()
    @IsString()
    name: string;
}

export class ProductResDto {
    @ApiProperty({ description: 'Product ID', example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ description: 'Product name', example: 'Quần' })
    @Expose()
    name: string;

    @ApiProperty({
        description: 'URL-friendly slug for SEO',
        example: 'quan-den',
    })
    @Expose()
    slug: string;

    @ApiProperty({
        description: 'Optional SKU for the product',
        example: 'QUAN-001',
        required: false,
    })
    @Expose()
    sku?: string;

    @ApiProperty({
        description: 'Detailed product description',
        example: 'Quần vải cao cấp',
        required: false,
    })
    @Expose()
    description?: string;

    @ApiProperty({
        description: 'Short product description',
        example: 'Quần thời trang',
        required: false,
    })
    @Expose()
    short_description?: string;

    @ApiProperty({
        description: 'Product status',
        enum: EStatus,
        example: EStatus.publish,
    })
    @Expose()
    status: EStatus;

    @ApiProperty({
        description: 'Regular price of the item',
        example: 100.0,
    })
    @Expose()
    regular_price: number;

    @ApiProperty({
        description: 'Sale price of the item (if on sale)',
        example: 80.0,
        required: false,
    })
    @Expose()
    sale_price?: number;

    @ApiProperty({
        description: 'Available stock quantity',
        example: 100,
    })
    @Expose()
    stock_quantity: number;

    @ApiProperty({
        description: 'Stock status: instock, outofstock, onbackorder',
        example: 'instock',
    })
    @Expose()
    stock_status: string;

    @ApiProperty({
        description: 'Brand name of the product',
        example: 'Nike',
        required: false,
    })
    @Expose()
    brand?: string;

    @Expose()
    @ApiProperty({ description: 'Enable flash sale', example: true })
    @IsBoolean()
    flashSale: boolean;

    @ApiProperty({
        description: 'Whether the product is visible on the frontend',
        example: true,
    })
    @Expose()
    is_visible: boolean;

    @ApiProperty({
        description: 'Whether the product is marked as featured',
        example: false,
    })
    @Expose()
    is_featured: boolean;

    @ApiProperty({
        description: 'URL or path to the featured image',
        example: '/images/quan.jpg',
        required: false,
    })
    @Expose()
    featured_image?: string;

    @ApiProperty({
        description: 'List of URLs or paths to gallery images',
        example: ['/images/quan1.jpg', '/images/quan2.jpg'],
        required: false,
    })
    @Expose()
    gallery_images?: string[];

    @ApiProperty({
        description: 'List of tag IDs or tag names',
        example: ['tag1', 'tag2'],
        required: false,
    })
    @Expose()
    tags?: string[];

    @ApiProperty({
        description: 'SEO meta title',
        example: 'Quần Đen Cao Cấp',
        required: false,
    })
    @Expose()
    meta_title?: string;

    @ApiProperty({
        description: 'SEO meta description',
        example: 'Mua quần đen chất lượng cao',
        required: false,
    })
    @Expose()
    meta_description?: string;

    @ApiProperty({ description: 'Whether reviews are allowed', example: true })
    @Expose()
    reviews_allowed: boolean;

    @ApiProperty({
        description: 'Average rating based on item reviews',
        example: 4.5,
    })
    @Expose()
    average_rating: number;

    @ApiProperty({
        description: 'Total number of reviews for all items',
        example: 10,
    })
    @Expose()
    review_count: number;

    @ApiProperty({
        description: 'List of related product IDs',
        example: [2, 3],
        required: false,
    })
    @Expose()
    related_products?: number[];

    @ApiProperty({
        description: 'Sort order for display',
        example: 1,
        required: false,
    })
    @Expose()
    index?: number;

    @ApiProperty({
        description: 'Creation date',
        example: '2025-04-15T10:00:00Z',
    })
    @Expose()
    createdAt: Date;

    @ApiProperty({
        description: 'Update date',
        example: '2025-04-15T10:00:00Z',
    })
    @Expose()
    updatedAt: Date;

    @ApiProperty({
        description: 'Product attributes',
        type: [ProductAttributeDto],
        required: false,
    })
    @Expose()
    @Type(() => ProductAttributeDto)
    @ValidateNested({ each: true })
    attributes: ProductAttributeDto[];

    @ApiProperty({
        description: 'Product categories',
        type: [CategoryDto],
        required: false,
    })
    @Expose()
    @Type(() => CategoryDto)
    @ValidateNested({ each: true })
    categories: CategoryDto[];
}
