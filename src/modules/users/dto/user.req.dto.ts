import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsEmail,
    IsIn,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

import { StringFieldOption } from '@shared/decorators/field.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

export class UserRequestDto {
    @ApiProperty({ required: true, example: 'johndoe' })
    @Expose()
    @IsString()
    username: string;

    @ApiProperty({ required: true, example: 'john@example.com' })
    @Expose()
    @IsEmail()
    email: string;

    @ApiProperty({ required: true, example: '+1234567890' })
    @Expose()
    @IsString()
    phone: string;

    @ApiProperty({ required: true, example: '1990-01-01' })
    @Expose()
    @IsString()
    bod: string;

    @ApiPropertyOptional({ example: 'User description' })
    @Expose()
    @IsString()
    @IsOptional()
    description?: string;
}

export class GetUserRequestDto extends PageOptionsDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({ enum: ['title', 'createdAt'] })
    @IsIn(['title', 'createdAt'])
    @StringFieldOption()
    readonly orderBy: string;
}

export class DeleteUserRequestDto {
    @ApiProperty({
        type: [Number],
        description: 'Array of user IDs',
    })
    @Expose()
    @IsArray()
    @IsNumber({}, { each: true })
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    @Type(() => Number)
    ids: number[];
}
