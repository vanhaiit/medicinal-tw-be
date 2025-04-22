import {
    type CallHandler,
    type ExecutionContext,
    type NestInterceptor,
    UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, type Observable } from 'rxjs';

interface ClassConstructor {
    new (...arg: any[]): object;
}

interface SerializeOptions {
    withMeta?: boolean;
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any, private options: SerializeOptions) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map(data => {
                if (this.options.withMeta) {
                    return {
                        data: plainToInstance(this.dto, data.data, {
                            excludeExtraneousValues: true,
                        }),
                        meta: data.meta,
                    };
                }

                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true,
                });
            }),
        );
    }
}

export function Serialize(
    dto: ClassConstructor,
    options: SerializeOptions = {},
) {
    return UseInterceptors(new SerializeInterceptor(dto, options));
}
