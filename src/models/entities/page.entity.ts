import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { PageDetailEntity } from './page-detail.entity';

@Entity('page')
export class PageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    template: string;

    @Column()
    generator: string;

    @Column({ name: 'application_name' })
    applicationName: string;

    @Column()
    referrer: string;

    @Column()
    keywords: string;

    @Column()
    authors: string;

    @Column()
    creator: string;

    @Column()
    publisher: string;

    @Column({ name: 'format_detection' })
    formatDetection: string;

    @Column()
    status: string;

    @Column()
    index: number;

    @Column()
    image: string;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt: Date;


    @OneToOne(() => PageDetailEntity, detail => detail.pageId)
    @JoinColumn({ name: 'id' })
    detail: PageDetailEntity;
}
