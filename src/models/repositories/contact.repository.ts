import { ContactEntity } from '@models/entities/contact.entity';
import { SortOrder } from 'constant/pagination.constant';

import { GetContactRequestDto } from '@modules/contact/dto/get-contact.dto';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

import { BaseRepository } from './base.repository';

@CustomRepository(ContactEntity)
export class ContactRepository extends BaseRepository<ContactEntity> {
    async getAll(options?: GetContactRequestDto) {
        const query = this.createQueryBuilder('contact');

        if (options?.search) {
            query.andWhere(`LOWER(contact.name) LIKE LOWER(:search)`, {
                search: `%${options.search.toLowerCase()}%`,
            });
        }

        if (options?.orderBy) {
            query.orderBy(
                `contact.${options.orderBy}`,
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
