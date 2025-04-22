import { UserRepository } from '@models/repositories/user.repository';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '@modules/users/user.module';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';
import { MailerService } from '@shared/modules/mailer/mailer.service';

import { JWT_ACCESS_TOKEN_TIMEOUT } from '../../constant/auth.constant';
import { AdminAuthController } from './admin-auth.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PublicStrategy } from './public.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET_KEY'),
                signOptions: {
                    expiresIn: JWT_ACCESS_TOKEN_TIMEOUT,
                },
            }),
            inject: [ConfigService],
        }),

        ConfigModule,
        TypeOrmExModule.forCustomRepository([UserRepository]),
    ],
    providers: [AuthService, JwtStrategy, PublicStrategy, MailerService],
    controllers: [AuthController, AdminAuthController],
    exports: [AuthService],
})
export class AuthModule {}
