import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional } from 'class-validator';

import { StringFieldOption } from '@shared/decorators/field.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

export class FileUploadRequestDto {
    @Expose()
    @ApiProperty({ example: 'uploads/filename.ext' })
    filePath: string;
}

export class UploadRequestDto {
    @Expose()
    @ApiProperty()
    url: string;
}

export class DeleteMediaUploadDto {
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

export class GetUploadRequestDto extends PageOptionsDto {
    @Expose()
    @ApiProperty({ required: false })
    @IsOptional()
    finderId?: number;

    @ApiPropertyOptional({ enum: ['name', 'createdAt'] })
    @IsIn(['url', 'createdAt'])
    @StringFieldOption()
    readonly orderBy: string;
}
