import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationCustomPipe implements PipeTransform {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToInstance(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            if (errors[0].constraints) {
                throw new BadRequestException(
                    errors[0].constraints[
                        Object.keys(errors[0].constraints)[0]
                    ],
                );
            } else if (errors[0].children.length > 0) {
                this.findError(errors[0].children);
            }
        }

        return object;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    protected findError(currentNode: any) {
        const node = currentNode[0];

        if (node?.constraints) {
            throw new BadRequestException(
                node.constraints[Object.keys(node.constraints)[0]],
            );
        }

        this.findError(node?.children);
    }
}
