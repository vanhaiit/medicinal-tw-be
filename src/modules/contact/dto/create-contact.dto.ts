import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
    @ApiProperty({ required: false, example: 1 })
    @Expose()
    @IsNumber()
    @IsOptional()
    userId?: number;

    @ApiProperty({ description: 'Name', example: 'John Doe' })
    @Expose()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Email',
        example: 'john.doe@example.com',
        required: true,
    })
    @Expose()
    @IsString()
    @IsOptional()
    email?: string;

    @ApiProperty({
        description: 'Phone',
        example: '123-456-7890',
        required: false,
    })
    @Expose()
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiProperty({ description: 'Message', example: 'Hello, I am John Doe' })
    @IsString()
    @IsNotEmpty()
    @Expose()
    message: string;
}
