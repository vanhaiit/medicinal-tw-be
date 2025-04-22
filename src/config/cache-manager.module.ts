// import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
// import { Global, Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import redisStore from 'cache-manager-redis-store';

// @Global()
// @Module({
//     imports: [
//         CacheModule.registerAsync({
//             imports: [ConfigModule],
//             inject: [ConfigService],
//             useFactory: async (configService: ConfigService) => {
//                 return {
//                     store: redisStore as any,
//                     host: configService.get('REDIS_HOST'),
//                     port: configService.get('REDIS_PORT'),
//                     auth_pass: configService.get('REDIS_PASSWORD') ?? null,
//                     db: configService.get('REDIS_DB') ?? 0,
//                 };
//             },
//         }),
//     ],
//     providers: [
//         {
//             provide: 'REDIS_CACHE_MANAGER',
//             useExisting: CACHE_MANAGER,
//         },
//     ],
//     exports: ['REDIS_CACHE_MANAGER'],
// })
// export class CacheManagerModule {}
