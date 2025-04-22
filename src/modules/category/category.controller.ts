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

import { AuthRoleGuard } from '@shared/decorators/http.decorator';
import { PublicRoute } from '@shared/decorators/public-route.decorator';

import { CategoryService } from './category.service';
import {
    CategoryRequestDto,
    DeleteCategoryRequestDto,
    GetCategoryRequestDto,
} from './dto/category.req.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @PublicRoute()
    getAll(@Query() query: GetCategoryRequestDto) {
        return this.categoryService.getAllCategory(query);
    }

    @Delete()
    @AuthRoleGuard([])
    delete(@Query() query: DeleteCategoryRequestDto) {
        return this.categoryService.deleteCategory(query);
    }

    @Put(':id')
    @AuthRoleGuard([])
    update(@Param('id') id: number, @Body() Body: CategoryRequestDto) {
        return this.categoryService.updateCategory(id, Body);
    }

    @Post()
    @PublicRoute()
    createCategory(@Body() body: CategoryRequestDto) {
        return this.categoryService.createCategory(body);
    }
}
