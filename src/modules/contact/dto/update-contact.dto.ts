import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EContactStatus } from 'constant/contact.constant';

export class UpdateContactDto {
    @Expose()
    @ApiProperty({ description: 'Name', example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Expose()
    @ApiProperty({
        description: 'Email',
        example: 'john.doe@example.com',
        required: true,
    })
    @IsString()
    @IsOptional()
    email?: string;

    @Expose()
    @ApiProperty({
        description: 'Phone',
        example: '123-456-7890',
        required: false,
    })
    @IsString()
    @IsOptional()
    phone?: string;

    @Expose()
    @ApiProperty({ description: 'Message', example: 'Hello, I am John Doe' })
    @IsString()
    @IsNotEmpty()
    message: string;

    @Expose()
    @ApiProperty({
        enum: EContactStatus,
        example: EContactStatus.pending,
        required: false,
    })
    @IsEnum(EContactStatus)
    @IsOptional()
    stockStatus?: string;
}
