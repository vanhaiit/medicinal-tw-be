import { Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { verify } from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';

import { JwtPayloadDto } from '@shared/dtos/jwt-payload.dto';
import { getUserRoomById } from '@shared/utils/socket-event';

@WebSocketGateway()
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    async handleDisconnect(client: Socket): Promise<void> {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    async handleConnection(client: Socket): Promise<void> {
        const token = client.handshake.query?.authorization;

        if (token) {
            try {
                const payload = verify(
                    token as string,
                    process.env.JWT_SECRET_KEY,
                ) as unknown as JwtPayloadDto;
                client.handshake['user'] = { userId: payload.id };
                client.join(`${getUserRoomById(payload.id)}`);
                this.logger.log(
                    `Client connected: ${client.id} - ${getUserRoomById(
                        payload.id,
                    )}`,
                );
            } catch (e) {
                client.disconnect();
                this.logger.log(e);
                this.logger.log(
                    `Failed to decode access token for client ${client.id}`,
                );
            }
        } else {
            this.logger.log(`Guest connected: ${client.id}`);
        }
    }
}
