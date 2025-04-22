import { plainToInstance } from 'class-transformer';

export default function mapDto<T>(data: any, dtoClass: new () => T): T {
    const dtoInstance = plainToInstance(dtoClass, data, {
        excludeExtraneousValues: true,
    });
    const validKeys = Object.keys(dtoInstance);

    return Object.keys(data).reduce((filtered, key) => {
        if (validKeys.includes(key)) {
            filtered[key] = data[key];
        }
        return filtered;
    }, {} as T);
}
