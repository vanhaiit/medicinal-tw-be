import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
    @ApiProperty({
        example: 1,
        description: 'ID of the user who made the comment',
    })
    @Expose()
    @IsNumber()
    userId: number;

    @ApiProperty({
        description: 'Full name of the user',
        example: 'John Doe',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Expose()
    fullName?: string;

    @ApiProperty({
        description: 'Gender of the user',
        example: 'male',
        required: false,
        enum: ['male', 'female'],
    })
    @IsOptional()
    @IsString()
    @Expose()
    @IsEnum(['male', 'female'])
    gender?: string;

    @ApiProperty({
        description: 'Birthday of the user (YYYY-MM-DD)',
        example: '1990-01-01',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Expose()
    birthday?: string;

    @ApiProperty({
        description: 'Phone number of the user',
        example: '+1234567890',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Expose()
    phone?: string;

    @ApiProperty({
        description: 'Address of the user',
        example: '123 Main Street',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Expose()
    address?: string;

    @ApiProperty({
        description: 'Avatar URL of the user',
        example: 'https://example.com/avatar.jpg',
        required: false,
    })
    @IsOptional()
    @IsString()
    @Expose()
    avatar?: string;
}
