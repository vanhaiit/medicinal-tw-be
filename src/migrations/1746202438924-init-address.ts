import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitAddress1746202438924 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'addresses',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'user_id',
                        type: 'integer',
                        isNullable: false,
                        comment: 'ID của người dùng',
                    },
                    {
                        name: 'receiver_name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                        comment: 'Tên người nhận',
                    },
                    {
                        name: 'receiver_phone',
                        type: 'varchar',
                        length: '20',
                        isNullable: false,
                        comment: 'Số điện thoại người nhận',
                    },
                    {
                        name: 'province',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                        comment: 'Tỉnh/Thành phố',
                    },
                    {
                        name: 'district',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                        comment: 'Quận/Huyện',
                    },
                    {
                        name: 'ward',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                        comment: 'Phường/Xã',
                    },
                    {
                        name: 'address_detail',
                        type: 'text',
                        isNullable: false,
                        comment: 'Địa chỉ chi tiết',
                    },
                    {
                        name: 'is_default',
                        type: 'boolean',
                        isNullable: false,
                        default: false,
                        comment: 'Địa chỉ mặc định',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('addresses');
    }
} 