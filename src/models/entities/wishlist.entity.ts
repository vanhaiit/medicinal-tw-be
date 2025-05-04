import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

// Assuming this exists based on order.entity.ts
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

// Assuming this exists; adjust if needed

@Entity('wishlist')
export class WishlistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'user_id',
        comment: 'ID của người dùng',
    })
    userId: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column({
        name: 'product_id',
        comment: 'ID của sản phẩm',
    })
    productId: number;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Timestamp when the wishlist item was created',
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        comment: 'Timestamp when the wishlist item was last updated',
    })
    updatedAt: Date;

    @Column({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        comment: 'Timestamp when the wishlist item was soft deleted',
    })
    deletedAt: Date;
}
