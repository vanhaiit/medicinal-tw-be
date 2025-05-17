import { UserEntity } from '@models/entities/user.entity';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthUser } from '@shared/decorators/auth-user.decorator';
import { AuthRoleGuard } from '@shared/decorators/http.decorator';

import { CartService } from './cart.service';
import {
    AddToCartDto,
    DeleteCartRequestDto,
    UpdateCartDto,
} from './dtos/cart.req.dto';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post()
    @AuthRoleGuard([])
    addToCart(@AuthUser() user: UserEntity, @Body() dto: AddToCartDto) {
        return this.cartService.addToCart(user.id, dto);
    }

    @Delete()
    @AuthRoleGuard([])
    removeFromCart(
        @AuthUser() user: UserEntity,
        @Query() query: DeleteCartRequestDto,
    ) {
        return this.cartService.removeFromCart(user.id, query.ids);
    }

    @Put(':itemId')
    @AuthRoleGuard([])
    updateQuantity(
        @AuthUser() user: UserEntity,
        @Param('itemId') itemId: number,
        @Body() dto: UpdateCartDto,
    ) {
        return this.cartService.updateQuantity(
            user.id,
            itemId,
            dto.quantity,
            dto.note,
        );
    }

    @Get()
    @AuthRoleGuard([])
    getCart(@AuthUser() user: UserEntity) {
        return this.cartService.getCart(user.id);
    }
}
