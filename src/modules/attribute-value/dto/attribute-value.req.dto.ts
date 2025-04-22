import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsIn,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

import { StringFieldOption } from '@shared/decorators/field.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

export class CreateAttributeValueReqDto {
    @ApiProperty({ description: 'Attribute ID', example: 1 })
    @Expose()
    @IsInt()
    attributeId: number;

    @ApiProperty({ description: 'Attribute value', example: 'Xanh' })
    @Expose()
    @IsString()
    value: string;

    @ApiPropertyOptional({
        description: 'Sort order for display',
        example: 1,
    })
    @Expose()
    @IsOptional()
    @IsInt()
    index?: number;

    @ApiPropertyOptional({
        description: 'URL or path to the featured image',
        example: 'https://example.com/image.jpg',
    })
    @Expose()
    @IsOptional()
    @IsString()
    image?: string;
}

export class UpdateAttributeValueReqDto extends CreateAttributeValueReqDto {}

export class GetAttibuteValueReqDto extends PageOptionsDto {
    @ApiPropertyOptional({ enum: ['createdAt'] })
    @IsIn(['name', 'createdAt'])
    @StringFieldOption()
    readonly orderBy: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    search: string;
}

export class DeleteAttributeValueReqDto {
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
