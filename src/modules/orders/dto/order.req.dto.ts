import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsEnum,
    IsIn,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { EOrderStatus } from 'constant/order.constant';

import { StringFieldOption } from '@shared/decorators/field.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

export class GetOrderRequestDto extends PageOptionsDto {
    @ApiPropertyOptional({ enum: ['name', 'createdAt'] })
    @IsIn(['name', 'createdAt'])
    @StringFieldOption()
    readonly orderBy: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    search: string;

    @Expose()
    @ApiProperty({
        description: 'Product status',
        example: EOrderStatus.completed,
        enum: EOrderStatus,
    })
    @IsEnum(EOrderStatus)
    @IsOptional()
    status?: EOrderStatus;

    @ApiPropertyOptional({ required: false })
    @IsString()
    @IsOptional()
    paymentMethod: string;

    @ApiPropertyOptional({ required: false })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    userId: number;
}

export class GetOrderOwnerRequestDto {
    @Expose()
    @ApiProperty({
        description: 'Product status',
        example: EOrderStatus.completed,
        enum: EOrderStatus,
    })
    @IsEnum(EOrderStatus)
    @IsOptional()
    status?: EOrderStatus;

    @ApiPropertyOptional({ required: false })
    @IsString()
    @IsOptional()
    paymentMethod: string;
}

export class DeleteOrderRequestDto {
    @ApiProperty({
        required: false,
        type: [Number],
        description: 'Array of IDs',
    })
    @Expose()
    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    @Type(() => Number)
    ids: number[];
}
