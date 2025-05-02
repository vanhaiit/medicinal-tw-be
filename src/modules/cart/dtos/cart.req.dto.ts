import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

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
