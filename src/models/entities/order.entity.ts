import { EOrderPaymentMethod, EOrderStatus } from 'constant/order.constant';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { OrderItemEntity } from './order-item.entity';
import { UserEntity } from './user.entity';
import { VoucherEntity } from './voucher.entity';

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'user_id',
        comment: 'ID of the user who placed the order',
    })
    userId: number;

    @Column({
        name: 'to_user_name',
        comment: 'Name of the recipient',
    })
    toUserName: string;

    @Column({
        name: 'to_phone',
        comment: 'Phone number of the recipient',
    })
    toPhone: string;

    @Column({
        comment: 'Email address of the recipient',
    })
    email: string;

    @Column({
        comment: 'District where the order will be delivered',
    })
    district: string;

    @Column({
        name: 'is_receive',
        default: false,
        comment: 'Whether the order has been received by the customer',
    })
    isReceive: boolean;

    @Column({
        nullable: true,
        comment: 'Additional notes or instructions for the order',
    })
    description: string;

    @Column({
        comment: 'Delivery address for the order',
    })
    address: string;

    @Column({
        comment: 'City where the order will be delivered',
    })
    city: string;

    @Column({
        name: 'voucher_id',
        nullable: true,
        comment: 'ID of the voucher applied to the order (if any)',
    })
    voucherId: number;

    @Column({
        name: 'shipping_fee',
        type: 'float',
        comment: 'Cost of shipping for the order',
    })
    shippingFee: number;

    @Column({
        type: 'float',
        comment: 'Total amount of the order before shipping and discounts',
    })
    amount: number;

    @Column({
        comment:
            'Current status of the order (e.g., pending, processing, completed)',
        enum: EOrderStatus,
        default: EOrderStatus.pending,
    })
    status: string;

    @Column({
        type: 'float',
        comment: 'Final total amount including shipping and after discounts',
    })
    total: number;

    @Column({
        name: 'payment_method',
        comment: 'Method used for payment (e.g., cash, credit card)',
        enum: EOrderPaymentMethod, // Example payment methods
        default: EOrderPaymentMethod.cash,
    })
    paymentMethod: number;

    @Column({
        nullable: true,
        comment: 'Customer feedback about the order',
    })
    feedback: string;

    @Column({
        nullable: true,
        comment: 'Rating given by the customer (if any)',
    })
    rate: number;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Timestamp when the order was created',
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Timestamp when the order was last updated',
    })
    updatedAt: Date;

    @Column({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        comment: 'Timestamp when the order was soft deleted (if applicable)',
    })
    deletedAt: Date;

    @OneToOne(() => VoucherEntity, v => v.id)
    @JoinColumn({ name: 'voucher_id' })
    voucher: VoucherEntity;

    @ManyToOne(() => UserEntity, user => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @OneToMany(() => OrderItemEntity, orderItem => orderItem.order)
    orderItems: OrderItemEntity[];
}
