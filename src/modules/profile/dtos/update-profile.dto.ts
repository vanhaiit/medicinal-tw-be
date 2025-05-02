import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateProfileDto {

    @ApiProperty({
        description: 'Full name of the user',
        example: 'John Doe',
        required: false,
    })
    @IsOptional()
    @IsString()
    fullName?: string;

    @ApiProperty({
        description: 'Gender of the user',
        example: 'male',
        required: false,
    })
    @IsOptional()
    @IsString()
    gender?: string;

    @ApiProperty({
        description: 'Birthday of the user (YYYY-MM-DD)',
        example: '1990-01-01',
        required: false,
    })
    @IsOptional()
    @IsString()
    birthday?: string;

    @ApiProperty({
        description: 'Phone number of the user',
        example: '+1234567890',
        required: false,
    })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({
        description: 'Address of the user',
        example: '123 Main Street',
        required: false,
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({
        description: 'Avatar URL of the user',
        example: 'https://example.com/avatar.jpg',
        required: false,
    })
    @IsOptional()
    @IsString()
    avatar?: string;
} 