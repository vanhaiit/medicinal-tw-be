import { CartRepository } from '@models/repositories/cart.repository';
import { ItemRepository } from '@models/repositories/item.responsitory';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AddToCartDto } from './dtos/cart.req.dto';

@Injectable()
export class CartService {
    constructor(
        private readonly cartRepository: CartRepository,
        private readonly itemRepository: ItemRepository,
    ) {}

    async addToCart(userId: number, dto: AddToCartDto) {
        const missingId = await this.itemRepository.checkItemExist(dto.itemId);

        if (missingId) {
            throw new HttpException(
                `Item with ID ${missingId} not found`,
                HttpStatus.BAD_REQUEST,
            );
        }

        let cartItem = await this.cartRepository.findOne({
            where: {
                userId,
                itemId: dto.itemId,
            },
        });

        if (cartItem) {
            cartItem.quantity += dto.quantity;
            if (dto.note !== undefined) {
                cartItem.note = dto.note;
            }
            return this.cartRepository.save(cartItem);
        }

        cartItem = this.cartRepository.create({
            userId,
            itemId: dto.itemId,
            quantity: dto.quantity,
            note: dto.note,
        });

        return this.cartRepository.save(cartItem);
    }

    async getCart(userId: number) {
        const cart = await this.cartRepository.find({
            where: { userId },
            relations: ['item'],
        });
        return cart;
    }

    async removeFromCart(userId: number, itemIds: number[]) {
        if (itemIds.length) {
            const result = await this.cartRepository.removeFromCart(
                userId,
                itemIds,
            );
            if (!result.affected) {
                throw new HttpException(
                    'No items found in cart',
                    HttpStatus.NOT_FOUND,
                );
            }
            return { message: `${result.affected} item(s) removed from cart` };
        } else {
            throw new HttpException(
                'No itemIds provided',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async updateQuantity(
        userId: number,
        itemId: number,
        quantity: number,
        note?: string,
    ) {
        if (typeof quantity !== 'number' || quantity < 1) {
            throw new HttpException(
                'Quantity must be a positive integer',
                HttpStatus.BAD_REQUEST,
            );
        }

        const cartItem = await this.cartRepository.findOne({
            where: { userId, itemId },
        });

        if (!cartItem) {
            throw new HttpException(
                'Item not found in cart',
                HttpStatus.NOT_FOUND,
            );
        }

        cartItem.quantity = quantity;
        if (note !== undefined) {
            cartItem.note = note;
        }
        await this.cartRepository.save(cartItem);
        return { message: 'Cart item quantity updated', cartItem };
    }

    async addManyToCart(userId: number, dtos: AddToCartDto[]) {
        const results = [];
        for (const dto of dtos) {
            try {
                const result = await this.addToCart(userId, dto);
                results.push({ success: true, itemId: dto.itemId, result });
            } catch (error) {
                results.push({
                    success: false,
                    itemId: dto.itemId,
                    error: error.message,
                });
            }
        }
        return results;
    }
}
