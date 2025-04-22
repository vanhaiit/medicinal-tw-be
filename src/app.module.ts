import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
// import { CacheManagerModule } from 'config/cache-manager.module';
import { ConfigurationModule } from 'config/config.module';
import { DefaultDatabaseModule } from 'config/postgre-sql.module';
// import { RedisModule } from 'config/redis.module';
import { MODULES } from 'modules';
import { join } from 'path';

import { GuardModule } from '@modules/auth/guards/guard.module';
import { EventModule } from '@modules/events/event.module';

import '@shared/common/paginate-typeorm';
import { InterceptorModule } from '@shared/interceptors/interceptor.module';
import { LoggerHttpRequestMiddleware } from '@shared/middlewares/logger.middleware';
import { MailerModule } from '@shared/modules/mailer/mailer.module';
import { PipeModule } from '@shared/pipes/pipe.module';

@Module({
    imports: [
        ConfigurationModule,
        DefaultDatabaseModule,
        PipeModule,
        InterceptorModule,
        GuardModule,
        // RedisModule,
        // CacheManagerModule,
        EventModule,
        MailerModule,
        ScheduleModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../', 'uploads'),
            serveRoot: '/uploads',
            serveStaticOptions: {
                setHeaders: res => {
                    res.setHeader(
                        'Cross-Origin-Resource-Policy',
                        'cross-origin',
                    );
                },
            },
        }),
        ...MODULES,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerHttpRequestMiddleware).forRoutes('*');
    }
}
