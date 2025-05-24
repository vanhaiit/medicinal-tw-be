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

import { UserEntity } from './user.entity';
import { EAddressType } from 'constant/address.constant';

@Entity('addresses')
export class AddressEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column({ name: 'receiver_name', type: 'varchar', length: 255 })
    receiverName: string;

    @Column({ name: 'receiver_phone', type: 'varchar', length: 20 })
    receiverPhone: string;

    @Column({ name: 'province', type: 'varchar', length: 100 })
    province: string;

    @Column({ name: 'district', type: 'varchar', length: 100 })
    district: string;

    @Column({ name: 'ward', type: 'varchar', length: 100 })
    ward: string;

    @Column({ name: 'address_detail', type: 'text' })
    addressDetail: string;

   @Column({
        nullable: true,
        comment: 'type of address',
        name: 'type_address',
        default: EAddressType.home,
        enum: EAddressType,
    })
    typeAddress: string;

    @Column({ name: 'is_default', type: 'boolean', default: false })
    isDefault: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;
}
