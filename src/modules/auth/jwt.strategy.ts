import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayloadDto } from '@shared/dtos/jwt-payload.dto';
import { fromObjectToJson } from '@shared/helpers/convert-json-data';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService, // @Inject('REDIS_CACHE_MANAGER') private readonly cacheManager: Cache,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET_KEY'),
        });
    }

    async validate(payload: JwtPayloadDto) {
        // const userKeys = await this.cacheManager.store.keys(
        //     getRedisUserKey(payload.id, '*'),
        // );

        const payloadJson = fromObjectToJson(payload);

        console.log('payloadJson', payloadJson);

        if (payload) {
            return payload;
        }

        // if (userKeys) {
        //     for (const key of userKeys) {
        //         const accessToken = await this.cacheManager.get<string>(key);
        //         const userPayloadJson = fromObjectToJson(
        //             this.jwtService.decode(accessToken),
        //         );
        //         if (
        //             userPayloadJson &&
        //             payload &&
        //             userPayloadJson === payloadJson
        //         ) {
        //             return payload;
        //         }
        //     }
        // }

        return false;
    }
}
