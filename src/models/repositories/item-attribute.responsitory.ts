import { ItemAttributeEntity } from '@models/entities/item-attribute.entity';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(ItemAttributeEntity)
export class ItemAttributeRepository extends BaseRepository<ItemAttributeEntity> {}
