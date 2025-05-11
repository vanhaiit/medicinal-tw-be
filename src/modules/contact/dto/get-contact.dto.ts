import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import { EContactStatus } from 'constant/contact.constant';

import { StringFieldOption } from '@shared/decorators/field.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

export class GetContactRequestDto extends PageOptionsDto {
    @ApiPropertyOptional({ enum: ['name', 'createdAt'] })
    @IsIn(['name', 'createdAt'])
    @StringFieldOption()
    readonly orderBy: string;

    @ApiPropertyOptional({
        description: 'Search by content',
        example: 'keyword',
    })
    @IsString()
    @IsOptional()
    search?: string;

    @ApiProperty({
        description: 'Product status',
        example: EContactStatus.pending,
        enum: EContactStatus,
    })
    @IsEnum(EContactStatus)
    status: EContactStatus;
}
