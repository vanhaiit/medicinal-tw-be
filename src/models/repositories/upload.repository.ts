import { UploadEntity } from '@models/entities/upload.entity';
import { SortOrder } from 'constant/pagination.constant';

import { GetUploadRequestDto } from '@modules/upload/dto/upload.request.dto';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

import { BaseRepository } from './base.repository';

@CustomRepository(UploadEntity)
export class UploadRepository extends BaseRepository<UploadEntity> {
    async getAllFile(options?: GetUploadRequestDto) {
        const query = this.createQueryBuilder('uploads');

        if (options?.finderId) {
            query.where(`uploads.finder_id = :finderId`, {
                finderId: options?.finderId,
            });
        }

        if (options?.orderBy) {
            query.orderBy(
                `uploads.${options.orderBy}`,
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
