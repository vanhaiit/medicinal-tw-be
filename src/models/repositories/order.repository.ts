import { OrderEntity } from '@models/entities/order.entity';

import {
    GetOrderOwnerRequestDto,
    GetOrderRequestDto,
} from '@modules/orders/dto/order.req.dto';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

import { BaseRepository } from './base.repository';

@CustomRepository(OrderEntity)
export class OrderRepository extends BaseRepository<OrderEntity> {
    async getOrderWithItems(orderId: number): Promise<OrderEntity> {
        return this.createQueryBuilder('orders')
            .leftJoinAndSelect('orders.orderItems', 'orderItems')
            .leftJoinAndSelect('orders.voucher', 'voucher')
            .leftJoinAndSelect('orderItems.item', 'item')
            .leftJoinAndSelect('orders.user', 'user')
            .where('orders.id = :orderId', { orderId })
            .getOne();
    }

    async getOrdersByUserId(
        userId: number,
        options: GetOrderOwnerRequestDto,
    ): Promise<OrderEntity[]> {
        const query = this.createQueryBuilder('orders')
            .leftJoinAndSelect('orders.orderItems', 'orderItems')
            .leftJoinAndSelect('orderItems.item', 'item')
            .leftJoinAndSelect('orders.user', 'user');

        if (options.status) {
            query.andWhere('orders.status = :status', {
                status: options.status,
            });
        }

        if (options.paymentMethod) {
            query.andWhere('orders.payment_method = :paymentMethod', {
                paymentMethod: options.paymentMethod,
            });
        }

        return query
            .andWhere('orders.user_id = :userId', { userId })
            .orderBy('orders.createdAt', 'DESC')
            .getMany();
    }

    async getAll(options?: GetOrderRequestDto) {
        const query = this.createQueryBuilder('orders')
            .leftJoinAndSelect('orders.orderItems', 'orderItems')
            .leftJoinAndSelect('orders.user', 'user');

        if (options.status) {
            query.andWhere('orders.status = :status', {
                status: options.status,
            });
        }

        if (options.paymentMethod) {
            query.andWhere('orders.payment_method = :paymentMethod', {
                paymentMethod: options.paymentMethod,
            });
        }

        if (options.userId) {
            query.andWhere('orders.user_id = :userId', {
                userId: options.userId,
            });
        }

        if (options.search) {
            query.andWhere(
                '(user.phone LIKE :search OR user.username LIKE :search)',
                { search: `%${options.search}%` },
            );
        }

        if (!!options) {
            const { limit, page, skip } = options;
            const pageOption = { page, limit, skip } as PageOptionsDto;
            return query.paginate(pageOption);
        }

        return query.getMany();
    }
}
