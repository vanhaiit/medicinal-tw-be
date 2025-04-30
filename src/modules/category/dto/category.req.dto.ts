import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

import { StringFieldOption } from '@shared/decorators/field.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';
import { ECategoryType } from 'constant/category.constant';

export class CategoryRequestDto {
    @ApiProperty({ required: false, example: 'Media Name' })
    @Expose()
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({ required: false, example: 'Cat description' })
    @Expose()
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({ required: false, example: 'product' })
    @IsIn([ECategoryType.post, ECategoryType.product])
    @Expose()
    @IsString()
    @IsOptional()
    type: string;

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

export class GetCategoryRequestDto extends PageOptionsDto {
    @ApiPropertyOptional({ enum: ['name', 'createdAt'] })
    @IsIn(['name', 'createdAt'])
    @StringFieldOption()
    readonly orderBy: string;

    @ApiPropertyOptional({ enum: [ECategoryType.post, ECategoryType.product] })
    @StringFieldOption()
    @IsIn([ECategoryType.post, ECategoryType.product])
    @IsString()
    @IsOptional()
    type: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    search: string;
}

export class DeleteCategoryRequestDto {
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
