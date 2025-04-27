import { VoucherEntity } from '@models/entities/voucher.entity';
import { SortOrder } from 'constant/pagination.constant';

import { GetVoucherRequestDto } from '@modules/voucher/dtos/voucher.request.dto';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

import { BaseRepository } from './base.repository';

@CustomRepository(VoucherEntity)
export class VoucherRepository extends BaseRepository<VoucherEntity> {
    async getAllVoucher(options?: GetVoucherRequestDto) {
        const query = this.createQueryBuilder('voucher');

        if (options.search) {
            query.andWhere(`LOWER(voucher.code) LIKE LOWER(:search)`, {
                search: `%${options.search.toLowerCase()}%`,
            });
        }

        if (options.orderBy) {
            query.orderBy(
                `voucher.${options.orderBy}`,
                options.direction || SortOrder.DESC,
            );
        }

        if (options.status) {
            query.where(`voucher.is_active = :active`, {
                active: options.status,
            });
        }

        if (!!options) {
            const { limit, page, skip } = options;
            const pageOption = { page, limit, skip } as PageOptionsDto;
            return query.paginate(pageOption);
        }

        return query.getMany();
    }

    async checkVoucher(id: number) {
        const voucher = await this.createQueryBuilder('voucher')
            .where('voucher.id = :id', { id })
            .andWhere('voucher.expires_at > EXTRACT(EPOCH FROM NOW())')
            .getOne();
        return voucher;
    }

    async getVoucherWithId(id: string) {
        const query = this.createQueryBuilder('voucher');
        if (Number.isNaN(parseInt(id))) {
            query.where('voucher.code = :id', { id });
        } else {
            query.where('voucher.id = :id', { id });
        }
        return await query.getOne();
    }
}
