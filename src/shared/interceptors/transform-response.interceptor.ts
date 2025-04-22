import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PageMetaDto } from '@shared/dtos/page-meta.dto';

export interface IResponse<T> {
    success: boolean;
    message: string;
    data: T;
    meta?: PageMetaDto;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, IResponse<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<IResponse<T>> {
        return next.handle().pipe(
            map(response => {
                const dataResponse = {
                    success: true,
                    message: 'success',
                } as IResponse<T>;

                if (
                    response &&
                    typeof response === 'object' &&
                    response?.data
                ) {
                    dataResponse.data = response.data;

                    if (response?.meta) dataResponse.meta = response?.meta;
                } else {
                    dataResponse.data = response;
                }

                return dataResponse;
            }),
        );
    }
}
