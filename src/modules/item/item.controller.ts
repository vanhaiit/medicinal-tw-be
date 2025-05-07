import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthRoleGuard } from '@shared/decorators/http.decorator';
import { PublicRoute } from '@shared/decorators/public-route.decorator';

import { CreateItemDto } from './dto/create-item.dto';
import { GetItemRequestDto, UpdateItemDto } from './dto/update-item.dto';
import { ItemService } from './item.service';

@ApiTags('items')
@Controller('items')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Post()
    @AuthRoleGuard([])
    @ApiOperation({ summary: 'Create new item' })
    @ApiResponse({
        status: 201,
        description: 'The item has been created successfully.',
    })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async create(@Body() createItemDto: CreateItemDto): Promise<any> {
        return this.itemService.create(createItemDto);
    }

    @Get()
    @PublicRoute()
    @ApiOperation({ summary: 'Get all items' })
    @ApiResponse({ status: 200, description: 'Return all items.' })
    async findAll(@Query() query: GetItemRequestDto): Promise<any> {
        return this.itemService.getAll(query);
    }

    @Get(':id')
    @PublicRoute()
    @ApiOperation({ summary: 'Get item by id' })
    @ApiResponse({ status: 200, description: 'Return the found item.' })
    @ApiResponse({ status: 404, description: 'Item not found.' })
    async findOne(@Param('id') id: number): Promise<any> {
        return this.itemService.findOne(id);
    }

    @Patch(':id')
    @AuthRoleGuard([])
    @ApiOperation({ summary: 'Update item by id' })
    @ApiResponse({
        status: 200,
        description: 'The item has been updated successfully.',
    })
    @ApiResponse({ status: 404, description: 'Item not found.' })
    async update(
        @Param('id') id: number,
        @Body() updateItemDto: UpdateItemDto,
    ): Promise<any> {
        return this.itemService.update(id, updateItemDto);
    }

    @Delete(':id')
    @AuthRoleGuard([])
    @ApiOperation({ summary: 'Delete item by id' })
    @ApiResponse({
        status: 200,
        description: 'The item has been deleted successfully.',
    })
    @ApiResponse({ status: 404, description: 'Item not found.' })
    async remove(@Param('id') id: number): Promise<any> {
        return this.itemService.remove(id);
    }
}
