// import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
// import { Emitter } from '@socket.io/redis-emitter';
// import { EUserSocketEvent } from 'constant/socket.constant';
// import { RedisClientType } from 'redis';

// import { getUserRoomById } from '@shared/utils/socket-event';

// import { LoggerService } from '../loggers/logger.service';
// import { BuyTokenSuccessfullyData, OpenBoxDto } from './dto/mint-ticket.dto';

// @Injectable()
// export class SocketEmitterService implements OnModuleInit {
//     private logger = this.loggerService.getLogger('SOCKET_EMITTER_SERVICE');
//     private __emitter: Emitter;

//     constructor(
//         @Inject('REDIS')
//         private readonly redisClient: RedisClientType,
//         private loggerService: LoggerService,
//     ) {}

//     async onModuleInit(): Promise<void> {
//         await this.initEmitter();
//     }

//     private async initEmitter(): Promise<void> {
//         this.__emitter = new Emitter(this.redisClient);
//     }

//     get emitter(): Emitter {
//         return this.__emitter;
//     }

//     emitSucceededOpenBox(userId: number, payload: OpenBoxDto): void {
//         this.logger.info(
//             `Emitting to ${getUserRoomById(userId)} event ${
//                 EUserSocketEvent.OPEN_BOX
//             }`,
//         );

//         this.__emitter
//             .to(getUserRoomById(userId))
//             .emit(EUserSocketEvent.OPEN_BOX, payload);
//     }

//     emitBuyTokenSuccessfullyEvent(
//         userId: number,
//         payload: BuyTokenSuccessfullyData,
//     ) {
//         this.logger.info(
//             `Emitting to ${getUserRoomById(userId)} event ${
//                 EUserSocketEvent.BUY_TOKEN_SUCCESSFULLY
//             }`,
//         );

//         this.__emitter
//             .to(getUserRoomById(userId))
//             .emit(EUserSocketEvent.BUY_TOKEN_SUCCESSFULLY, payload);
//     }

//     emitNotificationWithOrder(userId: number, payload: any): void {
//         this.logger.info(
//             `Emitting to ${getUserRoomById(userId)} event ${
//                 EUserSocketEvent.NOTIFICATIONS
//             }`,
//         );

//         this.__emitter
//             .to(getUserRoomById(userId))
//             .emit(EUserSocketEvent.NOTIFICATIONS, payload);
//     }
// }
