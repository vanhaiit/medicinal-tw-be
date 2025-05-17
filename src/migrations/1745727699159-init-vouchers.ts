import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class InitVouchers1745727699159 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'vouchers',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'discount_type',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'discount_value',
                        type: 'float',
                        isNullable: false,
                    },
                    {
                        name: 'is_active',
                        type: 'bool',
                        isNullable: false,
                        default: true,
                    },
                    {
                        name: 'start_at',
                        type: 'bigint',
                        isNullable: true,
                    },
                    {
                        name: 'expires_at',
                        type: 'bigint',
                        isNullable: true,
                    },
                    {
                        name: 'image',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'image_mobile',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'condition_apply',
                        type: 'float',
                        isNullable: true,
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
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ],
            }),
        );

        await queryRunner.createIndex('vouchers', new TableIndex({
            name: 'IDX_VOUCHERS_CODE',
            columnNames: ['code'],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('vouchers');
    }
}
