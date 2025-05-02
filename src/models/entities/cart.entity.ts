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

import { ItemEntity } from './item.entity';
import { UserEntity } from './user.entity';

@Entity('carts')
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'item_id' })
    itemId: number;

    @Column({ default: 0 })
    quantity: number;

    @Column({ nullable: true, type: 'text' })
    note?: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => ItemEntity)
    @JoinColumn({ name: 'item_id' })
    item: ItemEntity;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;
}
