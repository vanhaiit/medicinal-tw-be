import { ECategoryType } from "constant/category.constant";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitCategory1744716579127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'category',
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
                        name: 'slug',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true,
                        comment: 'URL-friendly slug for SEO',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'short_description',
                        type: 'text',
                        isNullable: true,
                        comment: 'Short product description for summaries',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: true,
                        default: `'${ECategoryType.product}'`
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
        await queryRunner.dropTable('category');
    }
}
