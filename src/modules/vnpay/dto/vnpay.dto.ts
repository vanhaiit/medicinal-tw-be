import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class VnPayRequestDto {
  
    @ApiProperty({ example: 1806000 })
    @IsNumber()
    @Expose()
    vnp_Amount: number;

    @ApiProperty({ example: '127.0.0.1' })
    @IsString()
    @Expose()
    vnp_IpAddr: string;

    @ApiProperty({ example: 'thanhtoandonhang' })
    @IsString()
    @Expose()
    vnp_OrderInfo: string;

    @ApiProperty({ example: '23554' })
    @IsString()
    @Expose()
    vnp_TxnRef: string;

}
