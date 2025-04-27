import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vouchers')
export class VoucherEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true })
    code: string;

    @Column({ name: 'discount_type', type: 'varchar' })
    discountType: string;

    @Column({
        name: 'discount_value',
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    discountValue: number;

    @Column({
        name: 'condition_apply',
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    conditionApply: number;

    @Column({ name: 'is_active', type: 'bool', default: true })
    isActive: boolean;

    @Column({ name: 'start_at', type: 'timestamp', nullable: true })
    startAt: number | null;

    @Column({ name: 'expires_at', type: 'timestamp', nullable: true })
    expiresAt: number | null;

    @Column({ type: 'varchar' })
    image: string;

    @Column({ name: 'image_mobile', type: 'varchar' })
    imageMobile: string;

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
    deletedAt: Date | null;
}
