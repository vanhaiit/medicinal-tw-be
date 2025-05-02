import {
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { OrderEntity } from './order.entity';
import { ProfileEntity } from './profile.entity';
import { UsersRoleEntity } from './users-role.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    bod: string;

    @Column({ name: 'is_locked' })
    isLocked: string;

    @Column()
    status: string;

    @Column()
    description: string;

    @Column()
    hash: string;

    @Column()
    salt: string;

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

    @OneToMany(() => UsersRoleEntity, userRole => userRole.user)
    userRoles: UsersRoleEntity[];

    @OneToMany(() => OrderEntity, order => order.user)
    orders: OrderEntity[];

    @OneToOne(() => ProfileEntity, profile => profile.user)
    profile: ProfileEntity;
}
