// import { Global, Module } from '@nestjs/common';
// import { RedisClientType } from 'redis';

// import { createClientRedis } from '@shared/utils/redis';

// @Global()
// @Module({
//     providers: [
//         {
//             provide: 'REDIS',
//             useFactory: async (): Promise<RedisClientType> => {
//                 const client = createClientRedis();
//                 await client.connect();
//                 return client;
//             },
//         },
//     ],
//     exports: ['REDIS'],
// })
// export class RedisModule {}
