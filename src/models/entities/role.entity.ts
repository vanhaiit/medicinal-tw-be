import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RolePermissionsEntity } from './role-permissions.entity';
import { UsersRoleEntity } from './users-role.entity';

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

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

    @OneToMany(() => UsersRoleEntity, userRole => userRole.role)
    userRoles: UsersRoleEntity[];

    @OneToMany(
        () => RolePermissionsEntity,
        rolePermission => rolePermission.role,
    )
    rolePermissions: RolePermissionsEntity[];
}
