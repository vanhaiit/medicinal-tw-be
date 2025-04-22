import { OrderItemEntity } from '@models/entities/order-item.entity';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(OrderItemEntity)
export class OrderItemRepository extends BaseRepository<OrderItemEntity> {}
