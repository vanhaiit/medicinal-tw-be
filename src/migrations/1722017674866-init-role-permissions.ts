import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class InitRolePermissions1722017674866 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'role_permissions',
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
                        name: 'role_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    {
                        name: 'permission_id',
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
            'role_permissions',
            new TableForeignKey({
                name: 'FK_role_id',
                columnNames: ['role_id'],
                referencedTableName: 'role',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );
        await queryRunner.createForeignKey(
            'role_permissions',
            new TableForeignKey({
                name: 'FK_permission_id',
                columnNames: ['permission_id'],
                referencedTableName: 'permission',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('role_permissions');
    }
}
