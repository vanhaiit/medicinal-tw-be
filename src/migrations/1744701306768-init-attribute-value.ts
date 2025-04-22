import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitAttributeValue1744701306768 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'attribute_values',
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
                        name: 'value',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'index',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'image',
                        type: 'varchar',
                        isNullable: true,
                        comment: 'URL or path to the featured image',
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
        await queryRunner.dropTable('attribute_value');
    }


}
