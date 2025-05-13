import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiPageOkResponse } from '@shared/decorators/api-ok-response.decorator';
import { AuthRoleGuard } from '@shared/decorators/http.decorator';
import { PublicRoute } from '@shared/decorators/public-route.decorator';

import {
    GetVoucherRequestDto,
    VoucherRequestDto,
} from './dtos/voucher.request.dto';
import { VoucherResponseDto } from './dtos/voucher.response.dto';
import { VoucherService } from './voucher.service';

@ApiTags('Voucher')
@Controller('voucher')
export class VoucherController {
    constructor(private readonly voucherService: VoucherService) {}

    @Get()
    @PublicRoute()
    @ApiPageOkResponse({ type: VoucherResponseDto, metadata: true })
    getAll(@Query() query: GetVoucherRequestDto) {
        return this.voucherService.getAllVoucher(query);
    }

    @Get(':id')
    @PublicRoute()
    @ApiPageOkResponse({ type: VoucherResponseDto, metadata: true })
    getDetailVoucher(@Param('id') id: string) {
        return this.voucherService.getDetailVoucher(id);
    }

    @Post()
    @AuthRoleGuard(['employee'])
    @ApiPageOkResponse({ type: VoucherResponseDto })
    createMessage(@Body() body: VoucherRequestDto) {
        return this.voucherService.createVoucher(body);
    }

    @Put(':id')
    @AuthRoleGuard(['employee'])
    @ApiPageOkResponse({ type: VoucherResponseDto })
    updateMessage(@Body() body: VoucherRequestDto, @Param('id') id: number) {
        return this.voucherService.updateVoucher(id, body);
    }

    @Delete(':id')
    @AuthRoleGuard(['employee'])
    deleteMessage(@Param('id') id: number) {
        return this.voucherService.deleteVoucher(id);
    }
}
