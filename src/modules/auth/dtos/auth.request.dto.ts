import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

import { StringField } from '@shared/decorators/field.decorator';

export class LoginBodyRequestDto {
    @ApiProperty({ required: true, example: 'abc@gmail.com' })
    @Expose()
    @IsEmail()
    email: string;

    @ApiProperty({ required: true })
    @Expose()
    @IsString()
    password: string;
}

export class SignUpRequestDto {
    @ApiProperty()
    @Expose()
    @IsString()
    @IsOptional()
    username: string;

    @ApiProperty({ example: '0987654321' })
    @Expose()
    @IsPhoneNumber('VN')
    phone: string;

    @ApiProperty({ required: true, example: 'abc@gmail.com' })
    @Expose()
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty()
    @Expose()
    @IsOptional()
    bod: string;

    @ApiProperty({ required: true })
    @Expose()
    @IsString()
    password: string;
}

export class RefreshTokenRequestDto {
    @ApiProperty()
    @Expose()
    @StringField()
    refreshToken: string;
}

export class ChangePasswordRequestDto {
    @ApiProperty({ required: true })
    @Expose()
    @IsString()
    oldPassword: string;

    @ApiProperty({ required: true })
    @Expose()
    @IsString()
    newPassword: string;
}

export class ForgotPasswordRequestDto {
    @ApiProperty({ required: true, example: 'hai.le@sotatek.com' })
    @Expose()
    @IsEmail()
    email: string;
}
