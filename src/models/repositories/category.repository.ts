import { CategoryEntity } from '@models/entities/category.entity';
import { SortOrder } from 'constant/pagination.constant';

import { GetCategoryRequestDto } from '@modules/category/dto/category.req.dto';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

import { BaseRepository } from './base.repository';

@CustomRepository(CategoryEntity)
export class CategoryRepository extends BaseRepository<CategoryEntity> {
    async getAll(options?: GetCategoryRequestDto) {
        const query = this.createQueryBuilder('category');

        if (options?.search) {
            query.andWhere(`LOWER(category.name) LIKE LOWER(:search)`, {
                search: `%${options.search.toLowerCase()}%`,
            });
        }

        if (options?.type) {
            query.where(`category.type = :type`, { type: options.type });
        }

        if (options?.orderBy) {
            query.orderBy(
                `category.${options.orderBy}`,
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
}
