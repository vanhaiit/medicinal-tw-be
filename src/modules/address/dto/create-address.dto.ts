import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EAddressType } from 'constant/address.constant';

export class CreateAddressDto {
    @Expose()
    @ApiProperty({ description: 'Tên người nhận', example: 'Nguyễn Văn A' })
    @IsString()
    @IsNotEmpty()
    receiverName: string;

    @Expose()
    @ApiProperty({
        description: 'Số điện thoại người nhận',
        example: '0901234567',
    })
    @IsString()
    @IsNotEmpty()
    receiverPhone: string;

    @Expose()
    @ApiProperty({ description: 'Tỉnh/Thành phố', example: 'Hà Nội' })
    @IsString()
    @IsNotEmpty()
    province: string;

    @Expose()
    @ApiProperty({ description: 'Quận/Huyện', example: 'Cầu Giấy' })
    @IsString()
    @IsNotEmpty()
    district: string;

    @Expose()
    @ApiProperty({ description: 'Phường/Xã', example: 'Dịch Vọng' })
    @IsString()
    @IsNotEmpty()
    ward: string;

    @Expose()
    @ApiProperty({
        description: 'address type',
        example: EAddressType.home,
        enum: EAddressType,
    })
    @IsEnum(EAddressType)
    @IsOptional()
    typeAddress?: EAddressType;

    @Expose()
    @ApiProperty({
        description: 'Địa chỉ chi tiết',
        example: 'Số 1, đường Trần Duy Hưng',
    })
    @IsString()
    @IsNotEmpty()
    addressDetail: string;

    @Expose()
    @ApiProperty({
        description: 'Địa chỉ mặc định',
        example: true,
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    isDefault?: boolean;
}
