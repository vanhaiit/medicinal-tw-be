import { AddressEntity } from '@models/entities/address.entity';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(AddressEntity)
export class AddressRepository extends BaseRepository<AddressEntity> {}
