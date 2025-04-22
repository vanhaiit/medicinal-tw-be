import { createClient, RedisClientType } from 'redis';

export const getRedisUserKey = (id: number, iat: string | number) =>
    `token:user:${id}:${iat}`;

export const getBlueprintOrderRedisKey = (
    orderId: string | number,
    userId: number,
) => `blueprint-order:order-${orderId}:user-${userId}`;

export function amountPerRequestKey() {
    return `pre-order:amount-per-request`;
}

export function dailySupplyKey() {
    return `pre-order:daily-supply`;
}

export function createClientRedis(): RedisClientType {
    const host = process.env.REDIS_HOST;
    const port = process.env.REDIS_PORT;
    const password = process.env.REDIS_PASSWORD;
    const database = +process.env.REDIS_DB || 0;

    return createClient({
        url: `redis://${host}:${port}`,
        password,
        database,
    });
}
