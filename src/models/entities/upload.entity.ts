import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('uploads')
export class UploadEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column({ name: 'finder_id' })
    finderId: number;

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
