import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { EDiscountType } from 'constant/voucher.constatnt';

import { StringFieldOption } from '@shared/decorators/field.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

export class VoucherRequestDto {
    @Expose()
    @ApiProperty({
        example: 'SUMMER2024',
        description: 'Unique code for the voucher',
    })
    @IsString()
    code: string;

    @Expose()
    @ApiProperty({
        example: 'percentage',
        description: 'Type of discount (e.g., percentage, fixed)',
        enum: EDiscountType,
    })
    @IsString()
    @IsEnum(EDiscountType)
    discountType: string;

    @Expose()
    @ApiProperty({
        example: 15.0,
        description: 'Discount value, can be a percentage or fixed amount',
    })
    @IsNumber()
    @IsOptional()
    discountValue: number;

    @Expose()
    @ApiProperty({
        example: 15.0,
    })
    @IsNumber()
    @IsOptional()
    conditionApply: number;

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
        example: '1725352572',
        description: 'Expiration date of the voucher',
        required: false,
    })
    @IsNumber()
    @IsOptional()
    startAt?: number;

    @Expose()
    @ApiProperty({
        example: '1725352572',
        description: 'Expiration date of the voucher',
        required: false,
    })
    @IsNumber()
    @IsOptional()
    expiresAt?: number;

    @Expose()
    @ApiProperty()
    @IsString()
    @IsOptional()
    image: string;

    @Expose()
    @ApiProperty()
    @IsString()
    @IsOptional()
    imageMobile: string;
}

export class GetVoucherRequestDto extends PageOptionsDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    search: string;

    @ApiPropertyOptional({ type: Boolean })
    status: boolean;

    @ApiPropertyOptional({ enum: ['createdAt'] })
    @IsIn(['createdAt'])
    @StringFieldOption()
    readonly orderBy: string;
}
