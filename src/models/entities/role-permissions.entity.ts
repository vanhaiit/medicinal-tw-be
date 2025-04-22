import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';

@Entity('role_permissions')
export class RolePermissionsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'role_id' })
    roleId: number;

    @Column({ name: 'permission_id' })
    permissionId: number;

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

    @ManyToOne(() => RoleEntity, role => role.rolePermissions)
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity;

    @ManyToOne(() => PermissionEntity, permission => permission.rolePermissions)
    @JoinColumn({ name: 'permission_id' })
    permission: PermissionEntity;
}
