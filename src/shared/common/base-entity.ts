import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Generated,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

export class BaseIdEntity {
    @Generated()
    @PrimaryColumn()
    id: number;
}

export class BaseEntity extends BaseIdEntity {
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;

    @BeforeInsert()
    insertDate() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    updateDate() {
        this.updatedAt = new Date();
    }
}

export class BaseExcludeDeletedAtEntity extends BaseIdEntity {
    @Column({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: 'updated_at' })
    updatedAt: Date;

    @BeforeInsert()
    insertDate() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    updateDate() {
        this.updatedAt = new Date();
    }
}
