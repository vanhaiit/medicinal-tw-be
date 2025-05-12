import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { EContactStatus } from 'constant/contact.constant';

export class UpdateContactDto {
    @Expose()
    @ApiProperty({
        enum: EContactStatus,
        example: EContactStatus.pending,
        required: false,
    })
    @IsEnum(EContactStatus)
    @IsOptional()
    status: string;
}
