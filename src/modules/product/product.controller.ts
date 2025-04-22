/*
https://docs.nestjs.com/controllers#controllers
*/
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

import { ApiPageOkResponse } from '@shared/decorators/api-ok-response.decorator';
import { PublicRoute } from '@shared/decorators/public-route.decorator';

import {
    CreateProductReqDto,
    GetProductRequestDto,
} from './dtos/product.req.dto';
import { ProductResDto } from './dtos/product.res.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @PublicRoute()
    @ApiPageOkResponse({ type: ProductResDto })
    createProduct(@Body() body: CreateProductReqDto) {
        return this.productService.createProduct(body);
    }

    @Get()
    @PublicRoute()
    getAll(@Query() query: GetProductRequestDto) {
        return this.productService.getAllProduct(query);
    }

    @Get(':id')
    @PublicRoute()
    @ApiPageOkResponse({ type: ProductResDto })
    getDetail(@Param('id') id: number) {
        return this.productService.getDetail(id);
    }

    @Put(':id')
    @PublicRoute()
    @ApiPageOkResponse({ type: ProductResDto })
    updateProduct(@Param('id') id: number, @Body() body: CreateProductReqDto) {
        return this.productService.updateProduct(id, body);
    }

    @Delete(':id')
    @PublicRoute()
    deleteProduct(@Param('id') id: number) {
        return this.productService.deleteProduct(id);
    }
}
