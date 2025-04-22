import { ItemEntity } from '@models/entities/item.entity';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(ItemEntity)
export class ItemRepository extends BaseRepository<ItemEntity> {}
