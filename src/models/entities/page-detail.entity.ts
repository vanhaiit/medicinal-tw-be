import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('page_detail')
export class PageDetailEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'page_id' })
    pageId: number;

    @Column({ type: 'json', nullable: true })
    content: any;

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
}
