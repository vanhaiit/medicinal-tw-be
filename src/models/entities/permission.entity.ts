import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RolePermissionsEntity } from './role-permissions.entity';

@Entity('permission')
export class PermissionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

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

    @OneToMany(
        () => RolePermissionsEntity,
        rolePermission => rolePermission.permission,
    )
    rolePermissions: RolePermissionsEntity[];
}
