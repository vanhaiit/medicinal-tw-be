import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

config();

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_DATABASE'),
                logging:
                    configService.get<string>('NODE_ENV') === 'development'
                        ? true
                        : undefined,
                entities: [
                    __dirname + '/../models/entities/**/*.entity.{js,ts}',
                ],
                subscribers: [
                    __dirname +
                        '/../models/subscribers/**/*.subscriber.{js,ts}',
                ],
            }),
            async dataSourceFactory(options) {
                if (!options) {
                    throw new Error('Invalid options passed');
                }

                return addTransactionalDataSource(new DataSource(options));
            },
        }),
    ],
})
export class DefaultDatabaseModule {}
