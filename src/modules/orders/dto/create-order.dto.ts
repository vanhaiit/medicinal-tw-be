import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
    ArrayMinSize,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { EAddressType } from 'constant/address.constant';
import {
    EOrderPaymentMethod,
    EOrderPaymentStatus,
    EOrderShippingBranch,
    EOrderStatus,
} from 'constant/order.constant';

import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
    @Expose()
    @ApiProperty({
        description: 'The ID of the user placing the order',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @Expose()
    @ApiProperty({
        description: 'Name of the recipient',
        example: 'John Doe',
    })
    @IsString()
    @IsNotEmpty()
    toUserName: string;

    @Expose()
    @ApiProperty({
        description: 'Phone number of the recipient',
        example: '+1234567890',
    })
    @IsString()
    @IsNotEmpty()
    toPhone: string;

    @Expose()
    @ApiProperty({
        description: 'Email address of the recipient',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Expose()
    @ApiProperty({
        description: 'District where the order will be delivered',
        example: 'District 1',
    })
    @IsString()
    @IsNotEmpty()
    district: string;

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
    })
    @IsString()
    @IsNotEmpty()
    address: string;

    @Expose()
    @ApiProperty({
        description: 'Shipping code',
        example: 'GH328728394',
    })
    @IsString()
    @IsOptional()
    shippingCode: string;

    @Expose()
    @ApiProperty({
        description: 'Current status of the order',
        example: EOrderShippingBranch.ghn,
        enum: EOrderShippingBranch,
        required: false,
    })
    @IsString()
    @IsEnum(EOrderShippingBranch)
    @IsOptional()
    shippingBranch: string;

    @Expose()
    @ApiProperty({
        description: 'City where the order will be delivered',
        example: 'Ho Chi Minh City',
    })
    @IsString()
    @IsNotEmpty()
    city: string;

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
    })
    @IsNumber()
    @IsNotEmpty()
    shippingFee: number;

    @Expose()
    @ApiProperty({
        description: 'Total amount of the order before shipping and discounts',
        example: 99.99,
    })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @Expose()
    @ApiProperty({
        description: 'Current status of the order',
        example: 'pending',
        enum: EOrderStatus,
        default: EOrderStatus.pending,
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @IsEnum(EOrderStatus)
    status: string;

    @Expose()
    @ApiProperty({
        description:
            'Final total amount including shipping and after discounts',
        example: 105.98,
    })
    @IsNumber()
    @IsNotEmpty()
    total: number;

    @Expose()
    @ApiProperty({
        description: 'Method used for payment',
        example: 1,
        enum: EOrderPaymentMethod, // 1: cash, 2: credit card, 3: bank transfer
    })
    @IsNumber()
    @IsNotEmpty()
    @IsEnum(EOrderPaymentMethod) // Assuming these are the payment method IDs
    paymentMethod: number;

    @Expose()
    @ApiProperty({
        description: 'Payment status of the order',
        example: EOrderPaymentStatus.pending,
        enum: EOrderPaymentStatus,
        default: EOrderPaymentStatus.pending,
    })
    @IsNumber()
    @IsEnum(EOrderPaymentStatus)
    @IsNotEmpty()
    paymentStatus: number;

    @Expose()
    @ApiProperty({
        description: 'address type',
        example: EAddressType.home,
        enum: EAddressType,
    })
    @IsEnum(EAddressType)
    @IsOptional()
    typeAddress?: EAddressType;

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
    })
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    @ArrayMinSize(1)
    orderItems: CreateOrderItemDto[];
}
