import { Module } from '@nestjs/common';
// import { CacheManagerModule } from 'config/cache-manager.module';
import { ConfigurationModule } from 'config/config.module';
import { DefaultDatabaseModule } from 'config/postgre-sql.module';
// import { RedisModule } from 'config/redis.module';
import { ConsoleModule } from 'nestjs-console';

import '@shared/common/paginate-typeorm';

import { MODULES } from './modules';

@Module({
    imports: [
        ConfigurationModule,
        DefaultDatabaseModule,
        ConsoleModule,
        // RedisModule,
        // CacheManagerModule,
        ...MODULES,
    ],
})
export class AppConsoleModule {}
