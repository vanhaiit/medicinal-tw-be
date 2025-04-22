import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { TransformInterceptor } from './transform-response.interceptor';

@Module({
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor,
        },
    ],
})
export class InterceptorModule {}
