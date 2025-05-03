import { ECategoryType } from 'constant/category.constant';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { ProductEntity } from './product.entity';

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, comment: 'Category name' })
    name: string;

    @Column({ nullable: false, comment: 'Category description' })
    description: string;

    @Column({
        name: 'slug',
        nullable: false,
        unique: true,
        comment: 'URL-friendly slug for SEO',
    })
    slug: string;

    @Column({
        name: 'short_description',
        type: 'text',
        nullable: true,
        comment: 'Short product description for summaries',
    })
    shortDescription: string;

    @Column({
        type: 'varchar',
        nullable: true,
        comment: 'Category type',
        default: ECategoryType.product,
    })
    type: string;

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

    // Relationship: ManyToMany with Product
    @ManyToMany(() => ProductEntity, product => product.categories)
    @JoinTable({
        name: 'product_category',
        joinColumn: { name: 'category_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
    })
    products: ProductEntity[];
}
