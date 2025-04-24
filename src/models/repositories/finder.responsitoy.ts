import { FinderEntity } from '@models/entities/finder.entity';

import { GetFinderRequestDto } from '@modules/finder/dto/finder.request.dto';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

import { BaseRepository } from './base.repository';

@CustomRepository(FinderEntity)
export class FinderRepository extends BaseRepository<FinderEntity> {
    async getAllFinder(options?: GetFinderRequestDto) {
        const query = this.createQueryBuilder('finders');

        if (options?.search) {
            query.andWhere(`LOWER(finders.name) LIKE LOWER(:search)`, {
                search: `%${options.search.toLowerCase()}%`,
            });
        }

        query.andWhere('finders.deleted_at IS NULL');

        if (!!options) {
            const { limit, page, skip } = options;
            const pageOption = { page, limit, skip } as PageOptionsDto;
            return query.paginate(pageOption);
        }
        return query.getMany();
    }
}
