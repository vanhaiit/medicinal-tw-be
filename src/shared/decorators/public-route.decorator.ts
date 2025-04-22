import type { CustomDecorator } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { PUBLIC_ROUTE_KEY } from 'constant/guard.contant';

export const PublicRoute = (): CustomDecorator =>
    SetMetadata(PUBLIC_ROUTE_KEY, true);
