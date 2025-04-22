import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { AttributeValueEntity } from './attribute-value.entity';
import { ProductAttributeEntity } from './product-attribute.entity';

@Entity('attributes')
export class AttributeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true, comment: 'Sort order for display' })
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

    // Relationship: One Attribute has many AttributeValues
    @OneToMany(
        () => AttributeValueEntity,
        attributeValue => attributeValue.attribute,
    )
    @JoinColumn({ name: 'id' })
    attributeValues: AttributeValueEntity[];

    // Relationship: One Attribute has many ProductAttributes
    @OneToMany(
        () => ProductAttributeEntity,
        productAttribute => productAttribute.attribute,
    )
    productAttributes: ProductAttributeEntity[];
}
