import { UsersRoleEntity } from '@models/entities/users-role.entity';

// You'll need to create this DTO
import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(UsersRoleEntity)
export class UserRoleRepository extends BaseRepository<UsersRoleEntity> {}
