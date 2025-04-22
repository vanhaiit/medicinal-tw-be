import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/models/entities/*.entity.js'],
    subscribers: ['dist/models/subscribers/*.subscriber.js'],
    migrationsTableName: 'custom_migration_table',
    migrations: ['dist/migrations/*.js'],
    logging:
        process.env.NODE_ENV && process.env.NODE_ENV === 'development'
            ? true
            : undefined,
    synchronize: false,
    extra: {
        decimalNumbers: true,
    },
});
