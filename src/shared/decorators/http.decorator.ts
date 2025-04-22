import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { RolesGuard } from '@modules/auth/guards/role.guard';

export function AuthRoleGuard(roles: string[]): MethodDecorator {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(RolesGuard),
        ApiBearerAuth(),
    );
}
