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

import { AuthUser, TokenUser } from '@shared/decorators/auth-user.decorator';
import { AuthRoleGuard } from '@shared/decorators/http.decorator';
import { PublicRoute } from '@shared/decorators/public-route.decorator';

import { CreateOrderDto } from './dto/create-order.dto';
import {
    DeleteOrderRequestDto,
    GetOrderOwnerRequestDto,
    GetOrderRequestDto,
} from './dto/order.req.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@ApiTags('Order')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @PublicRoute()
    create(@TokenUser() user: any, @Body() body: CreateOrderDto) {
        return this.ordersService.create(body, user?.id);
    }

    @Get()
    @PublicRoute()
    findAll(@Query() query: GetOrderRequestDto) {
        return this.ordersService.findAll(query);
    }

    @Get('detail/:id')
    @PublicRoute()
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id);
    }

    @Get('owner')
    @AuthRoleGuard([])
    findByUserId(
        @AuthUser() user: UserEntity,
        @Query() query: GetOrderOwnerRequestDto,
    ) {
        return this.ordersService.findByUserId(user.id, query);
    }

    @Put(':id')
    @PublicRoute()
    update(@Param('id') id: string, @Body() body: UpdateOrderDto) {
        return this.ordersService.update(+id, body);
    }

    @Delete()
    @AuthRoleGuard([])
    remove(@Query() query: DeleteOrderRequestDto) {
        return this.ordersService.remove(query);
    }
}
