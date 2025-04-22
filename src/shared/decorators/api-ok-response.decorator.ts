import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { PageDto } from '@shared/dtos/page.dto';

export function ApiPageOkResponse<T extends Type>(options: {
    type: T;
    isArray?: boolean;
    metadata?: boolean;
    description?: string;
}): MethodDecorator {
    const decorators = [];
    const allOf = [];
    const addProperties: Record<string, any> = {};

    if (options.metadata) {
        decorators.push(ApiExtraModels(PageDto));
        allOf.push({ $ref: getSchemaPath(PageDto) });
    }

    if (options.isArray || options.metadata) {
        addProperties.data = {
            type: 'array',
            items: { $ref: getSchemaPath(options.type) },
        };
    } else {
        addProperties.data = {
            $ref: getSchemaPath(options.type),
        };
    }

    decorators.push(ApiExtraModels(options.type));
    decorators.push(
        ApiOkResponse({
            description: options.description,
            schema: {
                allOf: [
                    {
                        properties: {
                            success: {
                                type: 'boolean',
                            },
                            message: {
                                type: 'string',
                                example: 'success',
                            },
                        },
                    },
                    ...allOf,
                    { properties: addProperties },
                ],
            },
        }),
    );

    return applyDecorators(...decorators);
}
