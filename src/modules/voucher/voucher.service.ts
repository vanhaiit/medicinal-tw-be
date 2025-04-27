import { VoucherRepository } from '@models/repositories/voucher.repositoty';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from 'constant/http-error.constant';

import mapDto from '@shared/helpers/mapdto';

import {
    GetVoucherRequestDto,
    VoucherRequestDto,
} from './dtos/voucher.request.dto';
import { VoucherResponseDto } from './dtos/voucher.response.dto';

@Injectable()
export class VoucherService {
    constructor(private readonly voucherRepository: VoucherRepository) {}

    async createVoucher(body: VoucherRequestDto): Promise<VoucherResponseDto> {
        const [, count] = await this.voucherRepository.findAndCount({
            where: { code: body.code },
        });

        if (count > 0) {
            throw new HttpException(
                httpErrors.VOUCHER_CODE_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
        const payload = mapDto(body, VoucherRequestDto);
        return this.voucherRepository.save(
            this.voucherRepository.create(payload),
        );
    }

    async getAllVoucher(query: GetVoucherRequestDto) {
        const [result, metadata]: any =
            await this.voucherRepository.getAllVoucher(query);
        return result.toPageDto(metadata);
    }

    async getDetailVoucher(id: string) {
        const voucher = await this.voucherRepository.getVoucherWithId(id);
        if (!voucher?.id) {
            throw new HttpException(
                httpErrors.VOUCHER_DOES_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
        return voucher;
    }

    async updateVoucher(
        id: number,
        body: VoucherRequestDto,
    ): Promise<VoucherRequestDto> {
        const [v, count] = await this.voucherRepository.findAndCount({
            where: { code: body.code },
        });

        if (count > 0 && v?.[0]?.id !== id) {
            throw new HttpException(
                httpErrors.VOUCHER_CODE_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }

        const voucher = await this.voucherRepository.findOne({ where: { id } });
        if (!voucher) {
            throw new HttpException(
                httpErrors.VOUCHER_DOES_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
        const payload = mapDto(body, VoucherRequestDto);
        return await this.voucherRepository.save({
            ...voucher,
            ...payload,
        });
    }

    async deleteVoucher(id: number): Promise<void> {
        const voucher = await this.voucherRepository.findOne({ where: { id } });
        if (!voucher) {
            throw new HttpException(
                httpErrors.VOUCHER_DOES_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
        await this.voucherRepository.remove(voucher);
    }
}
