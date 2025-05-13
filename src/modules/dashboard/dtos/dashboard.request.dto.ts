import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { EDateType } from 'constant/dashboard.constant';

export class ChartRequestDto {
    @Expose()
    @ApiProperty({
        example: '2024-09-19', // Updated to use the date format
        required: false,
    })
    @IsOptional()
    @IsDateString() // Validates the string as a date in ISO format (YYYY-MM-DD)
    startDate?: string;

    @Expose()
    @ApiProperty({
        example: '2024-09-23', // Updated to use the date format
        required: false,
    })
    @IsOptional()
    @IsDateString() // Validates the string as a date in ISO format (YYYY-MM-DD)
    endDate?: string;

    @Expose()
    @ApiProperty({
        required: true,
        enum: EDateType,
        example: EDateType.DAY,
    })
    @IsEnum(EDateType)
    type: string;
}

export class OverviewRequestDto {
    @Expose()
    @ApiProperty({
        example: '1727498745',
        required: false,
    })
    @IsOptional()
    startDate?: number;

    @Expose()
    @ApiProperty({
        example: '1727498767',
        required: false,
    })
    @IsOptional()
    endDate?: number;
}
