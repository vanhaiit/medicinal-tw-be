import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class AddToCartDto {
    @ApiProperty({ description: 'Product ID to add to cart', example: 1 })
    @IsInt()
    itemId: number;

    @ApiProperty({ description: 'Quantity to add', example: 1 })
    @IsInt()
    @Min(1)
    quantity: number;

    @ApiProperty({
        description: 'Note for the cart item',
        example: 'For mom',
        required: false,
    })
    note?: string;
}

export class UpdateCartDto {
    @ApiProperty({ description: 'New quantity', example: 2 })
    @IsInt()
    @Min(1)
    quantity: number;

    @ApiProperty({
        description: 'Note for the cart item',
        example: 'For mom',
        required: false,
    })
    note?: string;
}

export class DeleteCartRequestDto {
    @ApiProperty({
        type: [Number],
        description: 'Array of comment IDs to delete',
        required: false,
    })
    @Expose()
    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    @Type(() => Number)
    ids?: number[];
}

export class AddManyToCartDto {
    @ApiProperty({
        type: [AddToCartDto],
        description: 'List of items to add to cart',
    })
    @IsArray()
    @Type(() => AddToCartDto)
    items: AddToCartDto[];
}
