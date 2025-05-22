import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InitProfile1746199920954 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'profiles',
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
                        name: 'full_name',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                        comment: 'Tên đầy đủ',
                    },
                    {
                        name: 'gender',
                        type: 'varchar',
                        length: '10',
                        isNullable: true,
                        comment: 'Giới tính',
                    },
                    {
                        name: 'birthday',
                        type: 'date',
                        isNullable: true,
                        comment: 'Ngày sinh',
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        length: '20',
                        isNullable: true,
                        comment: 'Số điện thoại',
                    },
                    {
                        name: 'address',
                        type: 'text',
                        isNullable: true,
                        comment: 'Địa chỉ',
                    },
                    {
                        name: 'avatar',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                        comment: 'Ảnh đại diện',
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
        await queryRunner.dropTable('profiles');
    }

}
