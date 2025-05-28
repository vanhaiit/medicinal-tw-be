import {
    Body,
    Controller,
    Post,
    Get,
    Query,
    HttpCode,
    HttpStatus
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PublicRoute } from '@shared/decorators/public-route.decorator';
import { VnPayRequestDto } from './dto/vnpay.dto';
import { VnPayService } from './vnpay.service';
import mapDto from '@shared/helpers/mapdto';



@ApiTags('VnPay')
@Controller('vnpay')
export class VnPayController {
    constructor(private readonly vnpayService: VnPayService) {}

    @Post('payment')
    @PublicRoute()
    async createPayment(@Body() body: VnPayRequestDto) {
        try {
            const payload = mapDto(body, VnPayRequestDto);
            const paymentUrl = this.vnpayService.createPaymentUrl(payload);
            return {
                status: 'success',
                message: 'Payment URL created successfully',
                data: { paymentUrl }
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message || 'Failed to create payment URL',
                data: null
            };
        }
    }

    @Get('vnpay_ipn')
    @PublicRoute()
    @HttpCode(HttpStatus.OK)
    async vnpayIpn(@Query() query: any) {
        try {
            return this.vnpayService.verifyIpnUrl(query);
        } catch (error) {
            return {
                RspCode: '99',
                Message: 'Unknown error'
            };
        }
    }
}
