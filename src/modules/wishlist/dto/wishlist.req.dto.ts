import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

import { StringFieldOption } from '@shared/decorators/field.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

// Assuming this exists

export class CreateWishlistRequestDto {
    @ApiProperty({ required: true, example: 1, description: 'ID của sản phẩm' })
    @IsNumber()
    @Expose()
    productId: number;
}

export class UpdateWishlistRequestDto {
    @ApiPropertyOptional({
        example: 1,
        description: 'ID của người dùng (if updating)',
    })
    @IsNumber()
    @IsOptional()
    userId?: number;

    @ApiPropertyOptional({
        example: 1,
        description: 'ID của sản phẩm (if updating)',
    })
    @IsNumber()
    @IsOptional()
    productId?: number;
}

export class GetWishlistRequestDto extends PageOptionsDto {
    @ApiPropertyOptional({ enum: ['createdAt'] })
    @IsIn(['createdAt'])
    @StringFieldOption()
    readonly orderBy: string;

    @ApiPropertyOptional({ example: '' })
    @IsString()
    @IsOptional()
    search?: string;
}

export class DeleteWishlistRequestDto {
    @ApiProperty({ type: [Number], description: 'Array of wishlist IDs' })
    @IsArray()
    @IsNumber({}, { each: true })
    @Type(() => Number)
    ids: number[];
}
