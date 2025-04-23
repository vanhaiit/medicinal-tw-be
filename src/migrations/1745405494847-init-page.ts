import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitPage1745405494847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'page',
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
                        name: 'code',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'template',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'generator',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'application_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'referrer',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'keywords',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'authors',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'creator',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'publisher',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'format_detection',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'status',
                        type: 'integer',
                        isNullable: false,
                        default: 0,
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
        await queryRunner.dropTable('page');
    }

}
