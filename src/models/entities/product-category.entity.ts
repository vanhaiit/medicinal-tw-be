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

import { CategoryEntity } from './category.entity';
import { ProductEntity } from './product.entity';

@Entity('product_category')
export class ProductCategoryEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({
        name: 'product_id',
        nullable: false,
        comment: 'Foreign key to the product',
    })
    productId: number;

    @ManyToOne(() => ProductEntity, product => product.categories)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @Column({
        name: 'category_id',
        nullable: false,
        comment: 'Foreign key to the category',
    })
    categoryId: number;

    @ManyToOne(() => CategoryEntity, category => category.products)
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;

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
