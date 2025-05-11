import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('comments')
@Index('IDX_COMMENT_PRODUCT_ID', ['productId'])
export class CommentEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({
        name: 'user_id',
        type: 'integer',
        nullable: false,
        comment: 'ID of the user who made the comment',
    })
    userId: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column({
        name: 'product_id',
        type: 'integer',
        nullable: false,
        comment: 'ID of the product being commented on',
    })
    productId: number;

    @Column({
        name: 'content',
        type: 'varchar',
        nullable: false,
        comment: 'Content of the comment',
    })
    content: string;

    @Column({
        name: 'images',
        type: 'text',
        nullable: true,
        comment: 'JSON string array of image URLs',
    })
    images: string; // Lưu JSON.stringify([...])

    @Column({
        name: 'rating',
        type: 'integer',
        nullable: true,
        comment: 'Star rating, e.g. 1-5',
    })
    rating: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
    })
    deletedAt: Date;
}
