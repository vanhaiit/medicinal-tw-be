import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

import { StringFieldOption } from '@shared/decorators/field.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

export class FinderRequestDto {
    @ApiProperty({ required: true, example: 'uploads' })
    @Expose()
    @IsString()
    @IsOptional()
    name: string;
}

export class GetFinderRequestDto extends PageOptionsDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    search: string;

    @ApiPropertyOptional({ enum: ['createdAt'] })
    @IsIn(['createdAt'])
    @StringFieldOption()
    readonly orderBy: string;
}

export class DeleteFinderRequestDto {
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
