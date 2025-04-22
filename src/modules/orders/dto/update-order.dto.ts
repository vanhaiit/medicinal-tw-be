import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

import { CreateOrderItemDto } from './create-order-item.dto';

export class UpdateOrderDto {
    @Expose()
    @ApiProperty({
        description: 'Name of the recipient',
        example: 'John Doe',
        required: false,
    })
    @IsString()
    @IsOptional()
    toUserName?: string;

    @Expose()
    @ApiProperty({
        description: 'Phone number of the recipient',
        example: '+1234567890',
        required: false,
    })
    @IsString()
    @IsOptional()
    toPhone?: string;

    @Expose()
    @ApiProperty({
        description: 'Email address of the recipient',
        example: 'john.doe@example.com',
        required: false,
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @Expose()
    @ApiProperty({
        description: 'District where the order will be delivered',
        example: 'District 1',
        required: false,
    })
    @IsString()
    @IsOptional()
    district?: string;

    @Expose()
    @ApiProperty({
        description: 'Additional notes or instructions for the order',
        example: 'Please deliver after 5 PM',
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string;

    @Expose()
    @ApiProperty({
        description: 'Delivery address for the order',
        example: '123 Main Street',
        required: false,
    })
    @IsString()
    @IsOptional()
    address?: string;

    @Expose()
    @ApiProperty({
        description: 'City where the order will be delivered',
        example: 'Ho Chi Minh City',
        required: false,
    })
    @IsString()
    @IsOptional()
    city?: string;

    @Expose()
    @ApiProperty({
        description: 'ID of the voucher applied to the order (if any)',
        example: 1,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    voucherId?: number;

    @Expose()
    @ApiProperty({
        description: 'Cost of shipping for the order',
        example: 5.99,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    shippingFee?: number;

    @Expose()
    @ApiProperty({
        description: 'Total amount of the order before shipping and discounts',
        example: 99.99,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    amount?: number;

    @Expose()
    @ApiProperty({
        description: 'Current status of the order',
        example: 'pending',
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        required: false,
    })
    @IsString()
    @IsOptional()
    status?: string;

    @Expose()
    @ApiProperty({
        description:
            'Final total amount including shipping and after discounts',
        example: 105.98,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    total?: number;

    @Expose()
    @ApiProperty({
        description: 'Method used for payment',
        example: 1,
        enum: [1, 2, 3], // 1: cash, 2: credit card, 3: bank transfer
        required: false,
    })
    @IsNumber()
    @IsOptional()
    paymentMethod?: number;

    @Expose()
    @ApiProperty({
        description: 'List of items in the order',
        type: [CreateOrderItemDto],
        example: [
            {
                itemId: 1,
                quantity: 2,
                discount: 0,
                subtotal: 49.99,
                status: 'pending',
                note: 'Handle with care',
            },
        ],
        required: false,
    })
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    @IsOptional()
    orderItems?: CreateOrderItemDto[];
}
