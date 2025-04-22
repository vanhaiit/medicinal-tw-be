import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { AttributeEntity } from './attribute.entity';
import { ItemAttributeEntity } from './item-attribute.entity';

@Entity('attribute_values')
export class AttributeValueEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({
        name: 'attribute_id',
        nullable: true,
        comment: 'Foreign key to the parent attribute',
    })
    attributeId: number;

    @ManyToOne(() => AttributeEntity, attribute => attribute.attributeValues)
    @JoinColumn({ name: 'attribute_id' })
    attribute: AttributeEntity;

    @Column({ name: 'value', nullable: true })
    value: string;

    @Column({
        name: 'index',
        nullable: true,
        comment: 'Sort order for display',
    })
    index: number;

    @Column({
        name: 'image',
        nullable: true,
        comment: 'URL or path to the featured image',
    })
    image: string;

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

    @OneToMany(
        () => ItemAttributeEntity,
        itemAttribute => itemAttribute.attributeValue,
    )
    itemAttributes: ItemAttributeEntity[];
}
