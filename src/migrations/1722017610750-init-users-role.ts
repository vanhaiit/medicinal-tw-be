import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class InitUsersRole1722017610750 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users_role',
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
                        name: 'role_id',
                        type: 'integer',
                        isNullable: false,
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
        await queryRunner.createForeignKey(
            'users_role',
            new TableForeignKey({
                name: 'FK_user_id',
                columnNames: ['user_id'],
                referencedTableName: 'user',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );
        await queryRunner.createForeignKey(
            'users_role',
            new TableForeignKey({
                name: 'FK_role_id',
                columnNames: ['role_id'],
                referencedTableName: 'role',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_role');
    }
}
