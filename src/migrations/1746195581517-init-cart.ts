import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitCart1746195581517 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'carts',
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
                        name: 'item_id',
                        type: 'integer',
                        isNullable: false,
                        comment: 'ID của người dùng',
                    },
                    {
                        name: 'quantity',
                        type: 'integer',
                        isNullable: false,
                        default: 0,
                        comment: 'Tổng số lượng sản phẩm trong giỏ',
                    },
                    {
                        name: 'note',
                        type: 'text',
                        isNullable: true,
                        comment: 'Ghi chú cho sản phẩm trong giỏ',
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
        await queryRunner.dropTable('carts');
    }
} 