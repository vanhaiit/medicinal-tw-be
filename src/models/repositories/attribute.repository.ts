import { AttributeEntity } from '@models/entities/attribute.entity';
import { SortOrder } from 'constant/pagination.constant';

import { GetAttibuteReqDto } from '@modules/attribute/dto/attribute.req.dto';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

import { BaseRepository } from './base.repository';

@CustomRepository(AttributeEntity)
export class AttributeRepository extends BaseRepository<AttributeEntity> {
    async getAll(options?: GetAttibuteReqDto) {
        const query = this.createQueryBuilder('attributes').leftJoinAndSelect(
            'attributes.attributeValues',
            'attributeValues',
        );

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
