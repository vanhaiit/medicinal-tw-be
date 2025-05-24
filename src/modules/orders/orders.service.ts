import { CartRepository } from '@models/repositories/cart.repository';
import { ItemRepository } from '@models/repositories/item.responsitory';
import { OrderItemRepository } from '@models/repositories/order-item.repository';
import { OrderRepository } from '@models/repositories/order.repository';
import { VoucherRepository } from '@models/repositories/voucher.repositoty';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from 'constant/http-error.constant';

import mapDto from '@shared/helpers/mapdto';

import { CreateOrderDto } from './dto/create-order.dto';
import {
    DeleteOrderRequestDto,
    GetOrderOwnerRequestDto,
    GetOrderRequestDto,
} from './dto/order.req.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Transactional } from 'typeorm-transactional';
import { sendSms } from '@shared/utils/sms';
import { EOrderStatus } from 'constant/order.constant';

@Injectable()
export class OrdersService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly orderItemRepository: OrderItemRepository,
        private readonly voucherRepository: VoucherRepository,
        private readonly itemRepository: ItemRepository,
        private readonly cartRepository: CartRepository,
    ) { }

    async findAll(query: GetOrderRequestDto) {
        const [result, metadata]: any = await this.orderRepository.getAll(
            query,
        );
        return result.toPageDto(metadata);
    }

    @Transactional()
    async create(body: CreateOrderDto, userId: number) {
        const payload = mapDto(body, CreateOrderDto);

        const itemIds = payload.orderItems.map(e => e.itemId);

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

        const missingIds = await this.itemRepository.checkItemsExist(itemIds);

        if (missingIds) {
            throw new HttpException(
                `Items with IDs ${missingIds.join(', ')} not found`,
                HttpStatus.BAD_REQUEST,
            );
        }

        // Create and save order items
        const orderItems = payload.orderItems.map(item => ({
            ...item,
            orderId: order.id,
        }));

        await this.orderItemRepository.save(
            this.orderItemRepository.create(orderItems),
        );

        if (userId) {
            await this.cartRepository.removeFromCart(
                userId,
                itemIds,
            );
        }

        if (body?.toPhone) {
            sendSms(
                body?.toPhone,
                `Cảm ơn bạn đã đặt hàng tại Nguyễn Hiền. Mã đơn hàng của bạn là ORDER_${order.id}. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.`,
            )
        }

        return order;
    }

    async findOne(id: number) {
        return this.orderRepository.getOrderWithItems(id);
    }

    async findByUserId(userId: number, options: GetOrderOwnerRequestDto) {
        return this.orderRepository.getOrdersByUserId(userId, options);
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

        if (order.status !== EOrderStatus.pending && payload.status === EOrderStatus.pending) {
            throw new HttpException(
                'Đơn hàng đã xác nhận không thể thực hiện hành động này!',
                HttpStatus.BAD_REQUEST,
            );
        }

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

        const result = await this.orderRepository.save(updatedOrder);

        switch (result?.status) {
            case EOrderStatus.processing:
                sendSms(
                    order?.toPhone,
                    `Đơn hàng ORDER_${result.id} của bạn đã được xác nhận và chuyển cho đơn vị vận chuyển. Hãy chú ý điện thoại để nhận thông tin giao hàng sớm nhất nhé!`,
                );
                break;

            case EOrderStatus.completed:
                sendSms(
                    order?.toPhone,
                    `Đơn hàng ORDER_${result.id} của bạn đã được giao thành công. Cảm ơn bạn đã mua sắm tại Nguyễn Hiền!`,
                );
                break;
            case EOrderStatus.cancelled:
                sendSms(
                    order?.toPhone,
                    `Đơn hàng ORDER_${result.id} của bạn đã bị hủy. Nếu có thắc mắc, vui lòng liên hệ với chúng tôi qua hotline.`,
                );
                break;
            default:
                break;
        }
    }

    async remove(query: DeleteOrderRequestDto) {
        return await this.orderRepository.delete(query.ids);
    }
}
