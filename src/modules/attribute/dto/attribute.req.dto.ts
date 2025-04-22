import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsIn,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';

import { StringFieldOption } from '@shared/decorators/field.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

// DTO for AttributeValue (used in AttributeResDto)
class AttributeValueDto {
    @ApiProperty({ description: 'Attribute value ID', example: 1 })
    @Expose()
    @IsInt()
    id: number;

    @ApiProperty({ description: 'Attribute value', example: 'Xanh' })
    @Expose()
    @IsString()
    value: string;

    @ApiProperty({
        description: 'Sort order for display',
        example: 1,
        required: false,
    })
    @Expose()
    @IsOptional()
    @IsInt()
    index?: number;
}

// Request DTO for creating an Attribute
export class CreateAttributeReqDto {
    @Expose()
    @ApiProperty({ description: 'Attribute name', example: 'Màu sắc' })
    @IsString()
    name: string;

    @Expose()
    @ApiProperty({
        description: 'Sort order for display',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsInt()
    index?: number;

    @ApiProperty({
        required: false,
        example:
            'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg',
    })
    @Expose()
    @IsString()
    @IsOptional()
    image: string;
}

// Response DTO for an Attribute
export class AttributeResDto {
    @ApiProperty({ description: 'Attribute ID', example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ description: 'Attribute name', example: 'Màu sắc' })
    @Expose()
    name: string;

    @ApiProperty({
        description: 'Sort order for display',
        example: 1,
        required: false,
    })
    @Expose()
    index?: number;

    @ApiProperty({
        description: 'Url image',
        example:
            'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg',
    })
    @Expose()
    image: string;

    @ApiProperty({
        description: 'Creation date',
        example: '2025-04-15T10:00:00Z',
    })
    @Expose()
    createdAt: Date;

    @ApiProperty({
        description: 'Update date',
        example: '2025-04-15T10:00:00Z',
    })
    @Expose()
    updatedAt: Date;

    @ApiProperty({
        description: 'List of attribute values',
        type: [AttributeValueDto],
        required: false,
    })
    @Expose()
    @Type(() => AttributeValueDto)
    @ValidateNested({ each: true })
    attributeValues: AttributeValueDto[];
}

export class GetAttibuteReqDto extends PageOptionsDto {
    @ApiPropertyOptional({ enum: ['createdAt'] })
    @IsIn(['name', 'createdAt'])
    @StringFieldOption()
    readonly orderBy: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    search: string;
}

export class DeleteAttributeReqDto {
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
