import { Module } from '@nestjs/common';

import { SocketController } from '@modules/socket/socket.controller';
import { SocketService } from '@modules/socket/socket.service';

// import { SocketEmitterModule } from '@shared/modules/socket-emitter/socket-emitter.module';

@Module({
    // imports: [SocketEmitterModule],
    controllers: [SocketController],
    providers: [SocketService],
})
export class SocketModule {}
