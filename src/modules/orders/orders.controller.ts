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

import { PublicRoute } from '@shared/decorators/public-route.decorator';

import { CreateOrderDto } from './dto/create-order.dto';
import { DeleteOrderRequestDto, GetOrderRequestDto } from './dto/order.req.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
import { AuthRoleGuard } from '@shared/decorators/http.decorator';

@ApiTags('Order')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @PublicRoute()
    create(@Body() body: CreateOrderDto) {
        return this.ordersService.create(body);
    }

    @Get()
    @PublicRoute()
    findAll(@Query() query: GetOrderRequestDto) {
        return this.ordersService.findAll(query);
    }

    @Get(':id')
    @PublicRoute()
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id);
    }

    @Get('user/:userId')
    @PublicRoute()
    findByUserId(@Param('userId') userId: string) {
        return this.ordersService.findByUserId(+userId);
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
