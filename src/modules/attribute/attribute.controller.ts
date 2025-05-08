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

import { AttributeService } from './attribute.service';
import {
    CreateAttributeReqDto,
    DeleteAttributeReqDto,
    GetAttibuteReqDto,
} from './dto/attribute.req.dto';

@ApiTags('Attribute')
@Controller('attribute')
export class AttributeController {
    constructor(private readonly attributeService: AttributeService) {}

    @Get()
    @PublicRoute()
    getAll(@Query() query: GetAttibuteReqDto) {
        return this.attributeService.getAllAttribute(query);
    }

    @Post()
    @AuthRoleGuard([])
    create(@Body() body: CreateAttributeReqDto) {
        return this.attributeService.createAttribute(body);
    }

    @Put(':id')
    @AuthRoleGuard([])
    update(@Param('id') id: number, @Body() Body: CreateAttributeReqDto) {
        return this.attributeService.updateAttribute(id, Body);
    }

    @Delete()
    @AuthRoleGuard([])
    delete(@Query() query: DeleteAttributeReqDto) {
        return this.attributeService.deleteAttribute(query);
    }
}
