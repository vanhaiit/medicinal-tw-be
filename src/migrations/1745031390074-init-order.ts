import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitOrder1745031390074 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'orders',
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
                    },
                    {
                        name: 'to_user_name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'to_phone',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'district',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'is_receive',
                        type: 'bool',
                        default: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'voucher_id',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'shipping_fee',
                        type: 'float',
                        isNullable: false,
                    },
                    {
                        name: 'amount',
                        type: 'float',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'total',
                        type: 'float',
                        isNullable: false,
                    },
                    {
                        name: 'payment_method',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'feedback',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'rate',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'shipping_code',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'shipping_branch',
                        type: 'varchar',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders');
    }

}
