import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { EPostStatus } from 'constant/post.constant';

import { StringFieldOption } from '@shared/decorators/field.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

export class PostRequestDto {
    @ApiProperty({ required: true, example: 1 })
    @Expose()
    @IsNumber()
    @IsOptional()
    userId: number;

    @ApiProperty({ required: true, example: 1 })
    @Expose()
    @IsNumber()
    categoryId: number;

    @ApiProperty({ required: true, example: 'Post Title' })
    @Expose()
    @IsString()
    title: string;

    @ApiProperty({ required: true, example: 'post-title' })
    @Expose()
    @IsString()
    slug: string;

    @ApiProperty({ required: true, example: 'Content of the post' })
    @Expose()
    @IsString()
    content: string;

    @ApiProperty({ required: false, example: EPostStatus.draft })
    @Expose()
    @IsString()
    status: string;

    @ApiPropertyOptional({ example: 'Short description' })
    @Expose()
    @IsString()
    @IsOptional()
    shortDescription?: string;

    @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
    @Expose()
    @IsString()
    @IsOptional()
    featuredImage?: string;

    @ApiPropertyOptional({
        type: [String],
        example: [
            'https://example.com/img1.jpg',
            'https://example.com/img2.jpg',
        ],
    })
    @Expose()
    @IsArray()
    @IsOptional()
    galleryImages?: string[];
}

export class GetPostRequestDto extends PageOptionsDto {
    @ApiPropertyOptional({ enum: ['title', 'createdAt'] })
    @IsIn(['title', 'createdAt'])
    @StringFieldOption()
    readonly orderBy: string;

    @ApiPropertyOptional({ enum: [EPostStatus.draft, EPostStatus.publish] })
    @IsIn([EPostStatus.draft, EPostStatus.publish])
    @StringFieldOption()
    readonly status: string;

    @ApiPropertyOptional({ required: false, example: '' })
    @IsString()
    @IsOptional()
    search?: string;

    @ApiProperty({
        required: false,
        type: [Number],
        description: 'Array of category IDs',
    })
    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    @Transform(({ value }) => value && (Array.isArray(value) ? value : [value]))
    @Type(() => Number)
    categoryIds: number[];
}

export class DeletePostRequestDto {
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
