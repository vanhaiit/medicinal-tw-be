import { CartEntity } from '@models/entities/cart.entity';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(CartEntity)
export class CartRepository extends BaseRepository<CartEntity> {}
