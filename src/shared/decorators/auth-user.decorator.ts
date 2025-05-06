import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export function AuthUser() {
    return createParamDecorator((_data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.user;
    })();
}

export function TokenUser() {
    return createParamDecorator((_data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1];
        if (token) {
            const jwtService = new JwtService();
            return jwtService.decode(token);
        }
    })();
}
