import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitOrderItem1745031867121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'order_items',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'order_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'item_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'quantity',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'discount',
                        type: 'float',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'subtotal',
                        type: 'float',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        length: '50',
                        default: "'pending'",
                        isNullable: false,
                    },
                    {
                        name: 'note',
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
        await queryRunner.dropTable('order_items');
    }

}
