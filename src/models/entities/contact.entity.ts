import { EContactStatus } from 'constant/contact.constant';
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

@Entity('contacts')
export class ContactEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id', nullable: true })
    userId: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user?: UserEntity;

    @Column({ name: 'name', type: 'varchar', length: 255 })
    name: string;

    @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
    email?: string;

    @Column({ name: 'phone', type: 'varchar', length: 20, nullable: true })
    phone?: string;

    @Column({ name: 'message', type: 'text' })
    message: string;

    @Column({
        name: 'status',
        type: 'varchar',
        default: EContactStatus.pending,
    })
    status: EContactStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;
}
