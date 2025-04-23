import { PageEntity } from '@models/entities/page.entity';
import { SortOrder } from 'constant/pagination.constant';

import { GetPageRequestDto } from '@modules/page/dtos/page.request.dto';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

import { BaseRepository } from './base.repository';

@CustomRepository(PageEntity)
export class PageRepository extends BaseRepository<PageEntity> {
    async getAllPage(options?: GetPageRequestDto) {
        const query = this.createQueryBuilder('page')
        if (options.search) {
            query.andWhere(`LOWER(page.title) LIKE LOWER(:search)`, {
                search: `%${options.search.toLowerCase()}%`,
            });
        }
        if (options.orderBy) {
            query.orderBy(
                `page.${options.orderBy}`,
                options.direction || SortOrder.DESC,
            );
        }

        if (!!options) {
            const { limit, page, skip } = options;
            const pageOption = { page, limit, skip } as PageOptionsDto;
            return query.paginate(pageOption);
        }
        return query.getMany();
    }

    async getPageWithId(id: string): Promise<PageEntity> {
        const query = this.createQueryBuilder('page')
            .leftJoinAndSelect('page.detail', 'page_detail')

        if (Number.isNaN(parseInt(id))) {
            query.where('page.code = :id', { id });
        } else {
            query.where('page.id = :id', { id });
        }
        return await query.getOne();
    }
}
