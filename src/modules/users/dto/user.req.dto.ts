import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsEmail,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';
import { UserType } from 'constant/user.constant';

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

    @ApiPropertyOptional({ enum: ['username', 'createdAt'] })
    @IsIn(['username', 'createdAt'])
    @StringFieldOption()
    readonly orderBy: string;

    @ApiPropertyOptional({
        required: true,
        enum: [UserType.employee, UserType.customer],
        example: UserType.employee,
    })
    @IsIn([UserType.employee, UserType.customer])
    @IsString()
    @IsOptional()
    type: string;
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

export class CreateUserRequestDto {
    @ApiProperty({
        type: String,
        description: 'Username of the user',
        example: 'johndoe',
    })
    @IsString()
    @IsNotEmpty()
    @Expose()
    username: string;

    @ApiProperty({
        type: String,
        description: 'Password of the user, minimum 6 characters',
        example: 'password123',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Expose()
    password: string;

    @ApiProperty({
        type: String,
        description: 'Email address of the user',
        example: 'john@example.com',
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email: string;

    @ApiProperty({ required: true, example: '+1234567890' })
    @Expose()
    @IsString()
    phone: string;
}
