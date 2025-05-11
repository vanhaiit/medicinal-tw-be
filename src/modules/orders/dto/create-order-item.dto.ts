import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { EOrderItemStatus } from 'constant/order-item.constant';

export class CreateOrderItemDto {
    @Expose()
    @ApiProperty({
        description: 'The ID of the item',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    itemId: number;

    @Expose()
    @ApiProperty({
        description: 'Quantity of the item',
        example: 2,
    })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @Expose()
    @ApiProperty({
        description: 'Discount amount applied to this item',
        example: 0,
    })
    @IsNumber()
    @IsOptional()
    discount: number;

    @Expose()
    @ApiProperty({
        description: 'Total price for this item after discount',
        example: 49.99,
    })
    @IsNumber()
    @IsNotEmpty()
    subtotal: number;

    @Expose()
    @ApiProperty({
        description: 'Status of the order item',
        example: 'pending',
        enum: EOrderItemStatus,
        default: EOrderItemStatus.COMPLETED,
    })
    @IsString()
    @IsOptional()
    @IsEnum(EOrderItemStatus)
    status: string;

    @Expose()
    @ApiProperty({
        description: 'Additional notes or special instructions for this item',
        example: 'Handle with care',
        required: false,
    })
    @IsString()
    @IsOptional()
    note: string;
}
