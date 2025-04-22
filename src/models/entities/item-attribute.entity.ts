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

import { AttributeValueEntity } from './attribute-value.entity';
import { ItemEntity } from './item.entity';

@Entity('item_attributes')
export class ItemAttributeEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({
        name: 'item_id',
        nullable: true,
        comment: 'Foreign key to the item',
    })
    itemId: number;

    @ManyToOne(() => ItemEntity, item => item.itemAttributes)
    @JoinColumn({ name: 'item_id' })
    item: ItemEntity;

    @Column({
        name: 'attribute_value_id',
        nullable: true,
        comment: 'Foreign key to the attribute value',
    })
    attributeValueId: number;

    @ManyToOne(
        () => AttributeValueEntity,
        attributeValue => attributeValue.itemAttributes,
    )
    @JoinColumn({ name: 'attribute_value_id' })
    attributeValue: AttributeValueEntity;

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

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt: Date;
}
