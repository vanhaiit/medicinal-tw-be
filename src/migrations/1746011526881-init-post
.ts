import { EPostStatus } from "constant/post.constant";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitPost1746011526881 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'posts',
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
                        name: 'user_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'category_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'slug',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'content',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: false,
                        default: `'${EPostStatus.draft}'`
                    },
                    {
                        name: 'short_description',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'featured_image',
                        type: 'varchar',
                        isNullable: true,
                        comment: 'URL or path to the item-specific featured image',
                    },
                    {
                        name: 'gallery_images',
                        type: 'jsonb',
                        isNullable: true,
                        comment: 'List of URLs or paths to item-specific gallery images',
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
                indices: [
                    {
                        name: 'IDX_POSTS_USER_ID',
                        columnNames: ['user_id'],
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('posts');
    }

}
