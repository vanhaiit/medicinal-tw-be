import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed2747130540549 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Seed permissions
        await queryRunner.query(`
            INSERT INTO "permission" (id, key, name, description, created_at, updated_at)
            VALUES 
            (1, 'admin', 'admin', '', '2025-05-13 16:36:08.656', '2025-05-13 16:36:08.656'),
            (2, 'employee', 'employee', '', '2025-05-13 16:36:47.692', '2025-05-13 16:36:47.692')
        `);

        // Seed roles
        await queryRunner.query(`
            INSERT INTO "role" (id, name, description, created_at, updated_at)
            VALUES 
            (1, 'admin', '', '2025-05-13 16:21:30.450', '2025-05-13 16:21:30.450'),
            (2, 'employee', '', '2025-05-13 16:21:30.466', '2025-05-13 16:21:30.466')
        `);

        // Seed users
        await queryRunner.query(`
            INSERT INTO "user" (id, username, email, phone, bod, is_locked, status, description, hash, salt, type, created_at, updated_at)
            VALUES 
            (1, 'string', 'abc@gmail.com', '0987654321', 'string', 'UNLOCKED', 'ACTIVE', '', '$2b$10$pinX8QyPFkFdIsr3WkPD8u5/8N4eY4FKeiTNqLmpYHkJurtDzB52W', '$2b$10$pinX8QyPFkFdIsr3WkPD8u', 'customer', '2025-05-12 16:56:37.791', '2025-05-12 16:56:37.791')
        `);

        // Seed role_permissions
        await queryRunner.query(`
            INSERT INTO "role_permissions" (id, role_id, permission_id, created_at, updated_at)
            VALUES 
            (1, 1, 1, '2025-05-13 16:37:09.308', '2025-05-13 16:37:09.308'),
            (2, 2, 2, '2025-05-13 16:37:09.315', '2025-05-13 16:37:09.315'),
            (3, 1, 2, '2025-05-13 16:37:38.351', '2025-05-13 16:37:38.351')
        `);

        // Seed users_role
        await queryRunner.query(`
            INSERT INTO "users_role" (id, user_id, role_id, created_at, updated_at)
            VALUES 
            (1, 1, 1, '2025-05-13 16:21:45.367', '2025-05-13 16:21:45.367')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove data in reverse order to handle foreign key constraints
        await queryRunner.query('DELETE FROM "users_role"');
        await queryRunner.query('DELETE FROM "role_permissions"');
        await queryRunner.query('DELETE FROM "user"');
        await queryRunner.query('DELETE FROM "role"');
        await queryRunner.query('DELETE FROM "permission"');
    }
}
