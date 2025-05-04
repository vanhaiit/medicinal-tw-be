import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsIn,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import {
    EItemStatus,
    EItemType,
    EStockStatus,
    ETaxStatus,
} from 'constant/item.constant';
import { EStatus } from 'constant/product.constant';

import { StringFieldOption } from '@shared/decorators/field.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

// Request DTO for creating an Item
export class CreateItemReqDto {
    @ApiProperty({
        description: 'Stock Keeping Unit for item identification',
        example: 'QUAN-S-XANH',
        required: false,
    })
    @IsOptional()
    @IsString()
    sku?: string;

    @ApiProperty({ description: 'Item name', example: 'Quần size S màu xanh' })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'URL-friendly slug for SEO',
        example: 'quan-size-s-mau-xanh',
        required: false,
    })
    @IsOptional()
    @IsString()
    slug?: string;

    @ApiProperty({
        description: 'Detailed description of the item',
        example: 'Quần vải cao cấp, kích thước S, màu xanh',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Regular price of the item', example: 200000 })
    @IsNumber()
    regularPrice: number;

    @ApiProperty({
        description: 'Sale price of the item (if on sale)',
        example: 180000,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    salePrice?: number;

    @ApiProperty({ description: 'Available stock quantity', example: 100 })
    @IsInt()
    stockQuantity: number;

    @ApiProperty({
        description: 'Stock status',
        example: EStockStatus.instock,
        enum: EStockStatus,
    })
    @IsEnum(EStockStatus)
    stockStatus: EStockStatus;

    @ApiProperty({
        description: 'Enable stock management for this item',
        example: true,
    })
    @IsBoolean()
    manageStock: boolean;

    @ApiProperty({
        description: 'Item weight (e.g., in kg)',
        example: 0.5,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    weight?: number;

    @ApiProperty({
        description: 'Item length (e.g., in cm)',
        example: 70,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    length?: number;

    @ApiProperty({
        description: 'Item width (e.g., in cm)',
        example: 30,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    width?: number;

    @ApiProperty({
        description: 'Item height (e.g., in cm)',
        example: 5,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    height?: number;

    @ApiProperty({
        description: 'URL or path to the item-specific featured image',
        example: '/images/quan-s-xanh.jpg',
        required: false,
    })
    @IsOptional()
    @IsString()
    featuredImage?: string;

    @ApiProperty({
        description: 'List of URLs or paths to item-specific gallery images',
        example: ['/images/quan-s-xanh1.jpg', '/images/quan-s-xanh2.jpg'],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    galleryImages?: string[];

    @ApiProperty({
        description: 'Item type',
        example: EItemType.physical,
        enum: EItemType,
    })
    @IsEnum(EItemType)
    type: EItemType;

    @ApiProperty({
        description: 'Item status',
        example: EItemStatus.publish,
        enum: EItemStatus,
    })
    @IsEnum(EItemStatus)
    status: EItemStatus;

    @ApiProperty({
        description: 'Whether the item is available for purchase',
        example: true,
    })
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({
        description: 'SEO meta title for the item',
        example: 'Quần Size S Màu Xanh',
        required: false,
    })
    @IsOptional()
    @IsString()
    metaTitle?: string;

    @ApiProperty({
        description: 'SEO meta description for the item',
        example: 'Mua quần size S màu xanh chất lượng cao',
        required: false,
    })
    @IsOptional()
    @IsString()
    metaDescription?: string;

    @ApiProperty({
        description: 'Tax status',
        example: ETaxStatus.taxable,
        enum: ETaxStatus,
    })
    @IsEnum(ETaxStatus)
    taxStatus: ETaxStatus;

    @ApiProperty({
        description: 'Tax class for the item',
        example: 'standard',
        required: false,
    })
    @IsOptional()
    @IsString()
    taxClass?: string;

    @ApiProperty({
        description: 'Sort order for display',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsInt()
    index?: number;

    @ApiProperty({
        description: 'List of attribute value IDs',
        example: [1],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    attributeValueIds?: number[];
}

// Request DTO for creating a Product
export class CreateProductReqDto {
    @Expose()
    @ApiProperty({ description: 'Product name', example: 'Quần' })
    @IsString()
    name: string;

    @Expose()
    @ApiProperty({
        description: 'URL-friendly slug for SEO',
        example: 'quan-den',
    })
    @IsString()
    slug: string;

    @Expose()
    @ApiProperty({
        description: 'Optional SKU for the product',
        example: 'QUAN-001',
        required: false,
    })
    @IsOptional()
    @IsString()
    sku?: string;

    @Expose()
    @ApiProperty({
        description: 'Detailed product description',
        example: 'Quần vải cao cấp',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @Expose()
    @ApiProperty({
        description: 'Short product description',
        example: 'Quần thời trang',
        required: false,
    })
    @IsOptional()
    @IsString()
    shortDescription?: string;

    @Expose()
    @ApiProperty({
        description: 'Product status',
        example: EStatus.publish,
        enum: EStatus,
    })
    @IsEnum(EStatus)
    status: EStatus;

    @Expose()
    @ApiProperty({
        description: 'Whether the product is visible on the frontend',
        example: true,
    })
    @IsBoolean()
    isVisible: boolean;

    @Expose()
    @ApiProperty({
        description: 'Whether the product is marked as featured',
        example: false,
    })
    @IsBoolean()
    isFeatured: boolean;

    @Expose()
    @ApiProperty({
        description: 'URL or path to the featured image',
        example: '/images/quan.jpg',
        required: false,
    })
    @IsOptional()
    @IsString()
    featuredImage?: string;

    @Expose()
    @ApiProperty({
        description: 'List of URLs or paths to gallery images',
        example: ['/images/quan1.jpg', '/images/quan2.jpg'],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    galleryImages?: string[];

    @Expose()
    @ApiProperty({
        description: 'List of tag IDs or tag names',
        example: ['tag1', 'tag2'],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @Expose()
    @ApiProperty({
        description: 'SEO meta title',
        example: 'Quần Đen Cao Cấp',
        required: false,
    })
    @IsOptional()
    @IsString()
    metaTitle?: string;

    @Expose()
    @ApiProperty({
        description: 'SEO meta description',
        example: 'Mua quần đen chất lượng cao',
        required: false,
    })
    @IsOptional()
    @IsString()
    metaDescription?: string;

    @Expose()
    @ApiProperty({ description: 'Whether reviews are allowed', example: true })
    @IsBoolean()
    reviewsAllowed: boolean;

    @ApiProperty({
        description: 'List of related product IDs',
        example: [1],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    relatedProducts?: number[];

    @ApiProperty({
        description: 'List of category IDs',
        example: [1],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    categoryIds?: number[];

    @Expose()
    @ApiProperty({
        description: 'Sort order for display',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsInt()
    index?: number;

    @ApiProperty({
        description: 'List of attribute IDs',
        example: [1],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    attributeIds?: number[];

    @Expose()
    @ApiProperty({ description: 'Regular price of the item', example: 100.0 })
    @IsNumber()
    regularPrice: number;

    @Expose()
    @ApiProperty({
        description: 'Sale price of the item (if on sale)',
        example: 89.99,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    salePrice?: number;

    @Expose()
    @ApiProperty({ description: 'Available stock quantity', example: 100 })
    @IsInt()
    stockQuantity: number;

    @Expose()
    @ApiProperty({
        description: 'Stock status',
        example: EStockStatus.instock,
        enum: EStockStatus,
    })
    @IsEnum(EStockStatus)
    stockStatus: EStockStatus;

    @Expose()
    @ApiProperty({
        description: 'Brand name of the product',
        example: 'Nike',
        required: false,
    })
    @IsOptional()
    @IsString()
    brand?: string;

    @Expose()
    @ApiProperty({ description: 'Enable flash sale', example: true })
    @IsBoolean()
    flashSale: boolean;

    @Expose()
    @ApiProperty({ description: 'Enable bestSeller', example: true })
    @IsBoolean()
    bestSeller: boolean;

    @ApiProperty({
        description: 'List of items for the product',
        type: [CreateItemReqDto],
        required: false,
    })
    @Expose()
    @IsOptional()
    @IsArray()
    @Type(() => CreateItemReqDto)
    @ValidateNested({ each: true })
    items?: CreateItemReqDto[];
}

export class GetProductRequestDto extends PageOptionsDto {
    @ApiPropertyOptional({ enum: ['name', 'createdAt', 'salePrice'] })
    @IsIn(['name', 'createdAt', 'salePrice'])
    @StringFieldOption()
    readonly orderBy: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    search: string;

    @Expose()
    @ApiProperty({
        example: true,
        description: 'Indicates if the voucher is active',
        required: true,
    })
    @Transform(({ value }) =>
        value === 'true' ? true : value === 'false' ? false : value,
    )
    isActive?: boolean;

    @Expose()
    @ApiProperty({
        description: 'Indicates if the voucher is active',
        required: false,
    })
    @Transform(({ value }) =>
        value === 'true' ? true : value === 'false' ? false : value,
    )
    @IsOptional()
    flashSale?: boolean;

    @Expose()
    @ApiProperty({
        description: 'Indicates if the voucher is active',
        required: false,
    })
    @Transform(({ value }) =>
        value === 'true' ? true : value === 'false' ? false : value,
    )
    @IsOptional()
    bestSeller?: boolean;

    @ApiProperty({
        required: false,
        type: [Number],
        description: 'Array of category IDs',
    })
    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    @Transform(({ value }) => value && (Array.isArray(value) ? value : [value]))
    @Type(() => Number)
    categoryIds: number[];

    @ApiProperty({
        required: false,
        type: [Number],
        description: 'Array of itemAttributeIDs',
    })
    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    @Transform(({ value }) => value && (Array.isArray(value) ? value : [value]))
    @Type(() => Number)
    itemAttributeIDs: number[];

    @ApiPropertyOptional({
        description: 'Minimum price filter',
        example: 0,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    minPrice?: number;

    @ApiPropertyOptional({
        description: 'Maximum price filter',
        example: 1000000,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    maxPrice?: number;
}
