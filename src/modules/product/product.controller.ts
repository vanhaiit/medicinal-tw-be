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
import { TokenUser } from '@shared/decorators/auth-user.decorator';
import { AuthRoleGuard } from '@shared/decorators/http.decorator';
import { PublicRoute } from '@shared/decorators/public-route.decorator';

import {
    CreateProductReqDto,
    GetProductRequestDto,
    UpdateProductReqDto,
} from './dtos/product.req.dto';
import { ProductResDto } from './dtos/product.res.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @AuthRoleGuard(['employee'])
    @ApiPageOkResponse({ type: ProductResDto })
    createProduct(@Body() body: CreateProductReqDto) {
        return this.productService.createProduct(body);
    }

    @Get()
    @PublicRoute()
    getAll(@TokenUser() user: any, @Query() query: GetProductRequestDto) {
        return this.productService.getAllProduct(query, user?.id);
    }

    @Get(':id')
    @PublicRoute()
    @ApiPageOkResponse({ type: ProductResDto })
    getDetail(@TokenUser() user: any, @Param('id') id: string) {
        return this.productService.getDetail(id, user?.id);
    }

    @Put(':id')
    @AuthRoleGuard(['employee'])
    @ApiPageOkResponse({ type: ProductResDto })
    updateProduct(@Param('id') id: number, @Body() body: UpdateProductReqDto) {
        return this.productService.updateProduct(id, body);
    }

    @Delete(':id')
    @AuthRoleGuard(['employee'])
    deleteProduct(@Param('id') id: number) {
        return this.productService.deleteProduct(id);
    }
}
