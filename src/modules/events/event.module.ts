import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { EventGateway } from './event.gateway';

@Module({
    providers: [EventGateway],
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET_KEY'),
                signOptions: {
                    expiresIn: '1d',
                },
            }),
        }),
    ],
})
export class EventModule {}
