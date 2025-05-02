import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
    @ApiProperty({ description: 'Tên người nhận', example: 'Nguyễn Văn A' })
    @IsString()
    @IsNotEmpty()
    receiverName: string;

    @ApiProperty({
        description: 'Số điện thoại người nhận',
        example: '0901234567',
    })
    @IsString()
    @IsNotEmpty()
    receiverPhone: string;

    @ApiProperty({ description: 'Tỉnh/Thành phố', example: 'Hà Nội' })
    @IsString()
    @IsNotEmpty()
    province: string;

    @ApiProperty({ description: 'Quận/Huyện', example: 'Cầu Giấy' })
    @IsString()
    @IsNotEmpty()
    district: string;

    @ApiProperty({ description: 'Phường/Xã', example: 'Dịch Vọng' })
    @IsString()
    @IsNotEmpty()
    ward: string;

    @ApiProperty({
        description: 'Địa chỉ chi tiết',
        example: 'Số 1, đường Trần Duy Hưng',
    })
    @IsString()
    @IsNotEmpty()
    addressDetail: string;

    @ApiProperty({
        description: 'Địa chỉ mặc định',
        example: true,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    isDefault?: boolean;
}
