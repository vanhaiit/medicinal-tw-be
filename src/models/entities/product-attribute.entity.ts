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

import { AttributeEntity } from './attribute.entity';
import { ProductEntity } from './product.entity';

@Entity('product_attributes')
export class ProductAttributeEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({
        name: 'attribute_id',
        nullable: true,
        comment: 'Foreign key to the attribute',
    })
    attributeId: number;

    @ManyToOne(() => AttributeEntity, attribute => attribute.productAttributes)
    @JoinColumn({ name: 'attribute_id' })
    attribute: AttributeEntity;

    @Column({
        name: 'product_id',
        nullable: true,
        comment: 'Foreign key to the product',
    })
    productId: number;

    @ManyToOne(() => ProductEntity, product => product.productAttributes)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @Column({
        name: 'index',
        nullable: true,
        comment: 'Sort order for display',
    })
    index: number;

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
