import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    Min,
} from 'class-validator';
import { EItemStatus, ItemType, StockStatus } from 'constant/item.constant';

export class CreateItemDto {
    @Expose()
    @ApiProperty({ example: 1, description: 'Product ID' })
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    productId: number;

    @Expose()
    @ApiProperty({ example: 'SKU123', required: false })
    @IsString()
    @MaxLength(50)
    @IsOptional()
    sku?: string;

    @Expose()
    @ApiProperty({ example: 'Product Name' })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    name: string;

    @Expose()
    @ApiProperty({ example: 'Product description', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @Expose()
    @ApiProperty({ example: 99.99 })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    regularPrice: number;

    @Expose()
    @ApiProperty({ example: 79.99, required: false })
    @IsNumber()
    @Min(0)
    @IsOptional()
    salePrice?: number;

    @Expose()
    @ApiProperty({ example: 100 })
    @IsNumber()
    @Min(0)
    stockQuantity: number;

    @Expose()
    @ApiProperty({
        enum: StockStatus,
        example: StockStatus.IN_STOCK,
        required: false,
    })
    @IsEnum(StockStatus)
    @IsOptional()
    stockStatus?: string;

    @Expose()
    @ApiProperty({ example: true, required: false })
    @IsBoolean()
    @IsOptional()
    manageStock?: boolean;

    @Expose()
    @ApiProperty({ example: 'http://example.com/image.jpg', required: false })
    @IsString()
    @IsOptional()
    featuredImage?: string;

    @Expose()
    @ApiProperty({
        example: ['http://example.com/image1.jpg'],
        required: false,
    })
    @IsArray()
    @IsOptional()
    galleryImages?: string[];

    @Expose()
    @ApiProperty({ enum: ItemType, example: ItemType.SIMPLE, required: false })
    @IsEnum(ItemType)
    @IsOptional()
    type?: string;

    @Expose()
    @ApiProperty({
        enum: EItemStatus,
        example: EItemStatus.publish,
        required: false,
    })
    @IsEnum(EItemStatus)
    @IsOptional()
    status?: string;
}
