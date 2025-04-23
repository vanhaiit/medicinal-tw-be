import { PageDetailEntity } from '@models/entities/page-detail.entity';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(PageDetailEntity)
export class PageDetailRepository extends BaseRepository<PageDetailEntity> {}
