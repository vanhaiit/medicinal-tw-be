import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsPhoneNumber, IsString } from 'class-validator';

export class LoginResponseDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    username: string;

    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty()
    @Expose()
    phone: string;

    @ApiProperty()
    @Expose()
    roles: any;

    @ApiProperty()
    @Expose()
    accessToken: string;

    @ApiProperty()
    @Expose()
    refreshToken: string;
}

export class SignUpResponseDto {
    @Expose()
    @ApiProperty()
    id: number;

    @Expose()
    @ApiProperty()
    username: string;

    @Expose()
    @ApiProperty()
    email: string;

    @Expose()
    @ApiProperty()
    @IsPhoneNumber('VN')
    phone: string;
}

export class RefreshTokenResponseDto {
    @ApiProperty()
    accessToken: string;
}

export class SecretResponseDto {
    @Expose()
    @ApiProperty()
    secretCode: number;
}

export class ForgotPasswordResponseDto {
    @ApiProperty({ required: true })
    @IsString()
    url: string;
}
