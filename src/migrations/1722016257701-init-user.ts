import { UserIsLocked, UserStatus, UserType } from 'constant/user.constant';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitUser1722009252855 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
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
                        name: 'username',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'bod',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'is_locked',
                        type: 'varchar',
                        isNullable: true,
                        default: `'${UserIsLocked.UNLOCKED}'`,
                        comment: Object.keys(UserIsLocked).join(','),
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        default: `'${UserStatus.ACTIVE}'`,
                        comment: Object.keys(UserStatus).join(','),
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'hash',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'salt',
                        type: 'varchar',
                        isNullable: false,
                    },
                     {
                        name: 'type',
                        type: 'varchar',
                        isNullable: true,
                        default: `'${UserType.customer}'`,
                        comment: Object.keys(UserType).join(','),
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
        await queryRunner.dropTable('user');
    }
}
