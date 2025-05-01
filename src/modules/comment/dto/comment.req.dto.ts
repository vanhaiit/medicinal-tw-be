import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsIn,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';

import { StringFieldOption } from '@shared/decorators/field.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

export class CommentRequestDto {
    @ApiProperty({
        example: 1,
        description: 'ID of the user who made the comment',
    })
    @Expose()
    @IsNumber()
    userId: number;

    @ApiProperty({
        example: 1,
        description: 'ID of the product being commented on',
    })
    @Expose()
    @IsNumber()
    productId: number;

    @ApiProperty({
        example: 'This is a comment',
        description: 'Content of the comment',
    })
    @Expose()
    @IsString()
    content: string;

    @ApiPropertyOptional({
        type: [String],
        example: ['https://example.com/image1.jpg'],
    })
    @Expose()
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    @Transform(({ value }) =>
        Array.isArray(value) ? value : value ? [value] : [],
    )
    images?: string[];

    @ApiPropertyOptional({ example: 5, description: 'Star rating, e.g. 1-5' })
    @Expose()
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(5)
    rating?: number;
}

export class GetCommentRequestDto extends PageOptionsDto {
    @ApiPropertyOptional({ enum: ['name', 'createdAt'] })
    @IsIn(['createdAt'])
    @StringFieldOption()
    readonly orderBy: string;

    @ApiPropertyOptional({ example: 1, description: 'Filter by productId' })
    @IsNumber()
    @IsOptional()
    productId?: number;

    @ApiPropertyOptional({
        example: 'search text',
        description: 'Search in content',
    })
    @IsString()
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({ example: 5, description: 'Filter by rating' })
    @IsNumber()
    @IsOptional()
    rating?: number;
}

export class DeleteCommentRequestDto {
    @ApiProperty({
        type: [Number],
        description: 'Array of comment IDs to delete',
        required: false,
    })
    @Expose()
    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    @Type(() => Number)
    ids?: number[];
}
