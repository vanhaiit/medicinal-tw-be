import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
    IsIn,
    IsNumber,
    IsOptional,
    IsString,
    Validate,
} from 'class-validator';

import { StringFieldOption } from '@shared/decorators/field.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';
import { IsJsonString } from '@shared/utils/is-json-string';

export class CreatePageRequestDto {
    @Expose()
    @ApiProperty({ required: true, example: 'Page name' })
    @IsString()
    title: string;

    @Expose()
    @ApiProperty({ required: true, example: 'home_page' })
    @IsString()
    code: string;

    @Expose()
    @ApiProperty({
        required: false,
        example: 'This is a sample product description.',
    })
    @IsString()
    @IsOptional()
    description: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    template: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    generator: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    applicationName: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    referrer: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    keywords: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    formatDetection: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    index: number;

    @Expose()
    @ApiProperty({
        required: false,
        example: { description: 'oke', title: 'string' },
    })
    @IsOptional()
    @IsString()
    content: string;
}

export class UpdatePageRequestDto {
    @Expose()
    @ApiProperty({ required: false, example: 'Page name' })
    @IsString()
    @IsOptional()
    title: string;

    @Expose()
    @ApiProperty({ required: false, example: 'demo description' })
    @IsString()
    @IsOptional()
    description: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    template: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    generator: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    applicationName: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    referrer: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    keywords: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    formatDetection: string;

    @Expose()
    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    index: number;

    @Expose()
    @ApiProperty({
        required: false,
        example: { description: 'oke', title: 'json' },
    })
    @IsOptional()
    @Transform(({ value }) =>
        typeof value === 'string' ? value : JSON.stringify(value),
    )
    @Validate(IsJsonString)
    content: string;
}

export class GetPageRequestDto extends PageOptionsDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    search: string;

    @ApiPropertyOptional({ enum: ['title', 'createdAt'] })
    @IsIn(['title', 'createdAt'])
    @StringFieldOption()
    readonly orderBy: string;
}
