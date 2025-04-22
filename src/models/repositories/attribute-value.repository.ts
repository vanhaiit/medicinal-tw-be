import { AttributeValueEntity } from '@models/entities/attribute-value.entity';
import { SortOrder } from 'constant/pagination.constant';

import { GetAttibuteValueReqDto } from '@modules/attribute-value/dto/attribute-value.req.dto';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

import { BaseRepository } from './base.repository';

@CustomRepository(AttributeValueEntity)
export class AttributeValueRepository extends BaseRepository<AttributeValueEntity> {
    async getAll(options?: GetAttibuteValueReqDto) {
        const query = this.createQueryBuilder('attribute_values');

        if (options?.search) {
            query.andWhere(`LOWER(attributes.name) LIKE LOWER(:search)`, {
                search: `%${options.search.toLowerCase()}%`,
            });
        }

        if (options?.orderBy) {
            query.orderBy(
                `attributes.${options.orderBy}`,
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
