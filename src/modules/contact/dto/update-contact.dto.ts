import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateContactDto {
    @ApiProperty({ description: 'Name', example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Email',
        example: 'john.doe@example.com',
        required: true,
    })
    @IsString()
    @IsOptional()
    email?: string;

    @ApiProperty({
        description: 'Phone',
        example: '123-456-7890',
        required: false,
    })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiProperty({ description: 'Message', example: 'Hello, I am John Doe' })
    @IsString()
    @IsNotEmpty()
    message: string;
}
