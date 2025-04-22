import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';

@Entity('users_role')
export class UsersRoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'role_id' })
    roleId: number;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt: Date;

    @ManyToOne(() => UserEntity, user => user.userRoles)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => RoleEntity, role => role.userRoles)
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity;
}
