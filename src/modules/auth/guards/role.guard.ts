import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'constant/user.constant';

import { JwtPayloadDto } from '@shared/dtos/jwt-payload.dto';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    private hasPermission(data, keys): boolean {
        for (const item of data) {
            for (const rolePermission of item.role.rolePermissions) {
                if (keys.includes(rolePermission.permission.key)) {
                    return true;
                }
            }
        }
        return false;
    }

    async canActivate(context: ExecutionContext) {
        const { user } = context.switchToHttp().getRequest() as {
            user: JwtPayloadDto;
        };

        const roles = this.reflector.get<(typeof UserRole)[]>(
            'roles',
            context.getHandler(),
        );

        if (!roles?.length) return true;

        return this.hasPermission(user.roles, roles);
    }
}
