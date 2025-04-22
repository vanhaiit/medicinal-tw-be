import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { ItemEntity } from './item.entity';
import { OrderEntity } from './order.entity';

@Entity('order_items')
export class OrderItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'order_id', comment: 'Reference to the parent order' })
    orderId: number;

    @Column({
        name: 'item_id',
        comment: 'Reference to the product/item being ordered',
    })
    itemId: number;

    @Column({ comment: 'Quantity of the item ordered' })
    quantity: number;

    @Column({
        type: 'float',
        default: 0,
        comment: 'Discount amount applied to this item',
    })
    discount: number;

    @Column({
        type: 'float',
        comment: 'Total price for this item after discount',
    })
    subtotal: number;

    @Column({
        type: 'varchar',
        length: 50,
        default: 'pending',
        comment:
            'Status of the order item (e.g., pending, completed, cancelled)',
    })
    status: string;

    @Column({
        type: 'varchar',
        nullable: true,
        comment: 'Additional notes or special instructions for this item',
    })
    note: string;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Timestamp when the order item was created',
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Timestamp when the order item was last updated',
    })
    updatedAt: Date;

    @Column({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        comment: 'Timestamp when the order item was soft deleted',
    })
    deletedAt: Date;

    @ManyToOne(() => OrderEntity, order => order.orderItems)
    @JoinColumn({ name: 'order_id' })
    order: OrderEntity;

    @ManyToOne(() => ItemEntity, item => item.orderItems)
    @JoinColumn({ name: 'item_id' })
    item: ItemEntity;
}
