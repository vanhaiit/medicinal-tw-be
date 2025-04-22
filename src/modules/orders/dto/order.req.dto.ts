import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

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

    @ApiPropertyOptional({ required: false })
    @IsString()
    @IsOptional()
    status: string;

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
