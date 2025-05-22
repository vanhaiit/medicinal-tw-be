import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('profiles')
export class ProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'full_name', type: 'varchar', length: 255, nullable: true })
    fullName?: string;

    @Column({ name: 'gender', type: 'varchar', length: 10, nullable: true })
    gender?: string;

    @Column({ name: 'birthday', type: 'date', nullable: true })
    birthday?: string;

    @Column({ name: 'phone', type: 'varchar', length: 20, nullable: true })
    phone?: string;

    @Column({ name: 'address', type: 'text', nullable: true })
    address?: string;

    @Column({ name: 'avatar', type: 'varchar', length: 255, nullable: true })
    avatar?: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;
}
