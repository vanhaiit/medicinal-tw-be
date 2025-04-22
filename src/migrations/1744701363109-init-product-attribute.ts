import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitProductAttribute1744701363109 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'product_attributes',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        isUnique: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'attribute_id',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'product_id',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'index',
                        type: 'integer',
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
        await queryRunner.dropTable('product_attribute');
    }

}
