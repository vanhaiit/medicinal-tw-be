import { OrderItemRepository } from '@models/repositories/order-item.repository';
import { OrderRepository } from '@models/repositories/order.repository';
import { VoucherRepository } from '@models/repositories/voucher.repositoty';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from 'constant/http-error.constant';

import mapDto from '@shared/helpers/mapdto';

import { CreateOrderDto } from './dto/create-order.dto';
import { DeleteOrderRequestDto, GetOrderRequestDto } from './dto/order.req.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly orderItemRepository: OrderItemRepository,
        private readonly voucherRepository: VoucherRepository,
    ) {}

    async findAll(query: GetOrderRequestDto) {
        const [result, metadata]: any = await this.orderRepository.getAll(
            query,
        );
        return result.toPageDto(metadata);
    }

    async create(body: CreateOrderDto) {
        const payload = mapDto(body, CreateOrderDto);

        if (!!payload?.voucherId) {
            const voucher = await this.voucherRepository.checkVoucher(
                payload?.voucherId,
            );
            if (!voucher?.id) {
                throw new HttpException(
                    httpErrors.VOUCHER_CODE_EXPIRED,
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        // Create and save the order first
        const order = await this.orderRepository.save(
            this.orderRepository.create({
                ...payload,
            }),
        );

        // Create and save order items
        const orderItems = payload.orderItems.map(item => ({
            ...item,
            orderId: order.id,
        }));

        await this.orderItemRepository.save(
            this.orderItemRepository.create(orderItems),
        );

        return order;
    }

    async findOne(id: number) {
        return this.orderRepository.getOrderWithItems(id);
    }

    async findByUserId(userId: number) {
        return this.orderRepository.getOrdersByUserId(userId);
    }

    async update(id: number, body: UpdateOrderDto) {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) {
            throw new HttpException(
                httpErrors.ORDER_DOES_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
        const payload = mapDto(body, UpdateOrderDto);
        const updatedOrder = {
            ...order,
            ...payload,
            paymentMethod: Number(payload.paymentMethod) || order.paymentMethod,
        };

        // Update order items if provided
        if (payload.orderItems?.length) {
            // Delete existing order items
            await this.orderItemRepository.delete({ orderId: id });

            // Create new order items
            const orderItems = payload.orderItems.map(item => ({
                ...item,
                orderId: id,
            }));

            await this.orderItemRepository.save(
                this.orderItemRepository.create(orderItems),
            );
        }

        delete updatedOrder.orderItems;
        return await this.orderRepository.save(updatedOrder);
    }

    async remove(query: DeleteOrderRequestDto) {
        return await this.orderRepository.delete(query.ids);
    }
}
