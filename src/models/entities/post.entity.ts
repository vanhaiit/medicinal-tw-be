import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';
import { CategoryEntity } from './category.entity';
import { EPostStatus } from 'constant/post.constant';

@Entity('posts')
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column({ name: 'category_id' })
    categoryId: number;

    @ManyToOne(() => CategoryEntity, category => category.id)
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column()
    content: string;

    @Column({ nullable: true, comment: 'Category status', default: EPostStatus.draft })
    status: string;

    @Column({ name: 'short_description', nullable: true })
    shortDescription: string;

    @Column({ name: 'featured_image', nullable: true, comment: 'URL or path to the item-specific featured image' })
    featuredImage: string;

    @Column({ name: 'gallery_images', type: 'jsonb', nullable: true, comment: 'List of URLs or paths to item-specific gallery images' })
    galleryImages: string[];

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt: Date;
}
