import { ProfileEntity } from '@models/entities/profile.entity';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(ProfileEntity)
export class ProfileRepository extends BaseRepository<ProfileEntity> {} 