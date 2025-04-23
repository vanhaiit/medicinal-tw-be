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

import { AttributeValueService } from './attribute-value.service';
import {
    CreateAttributeValueReqDto,
    DeleteAttributeValueReqDto,
    GetAttibuteValueReqDto,
    UpdateAttributeValueReqDto,
} from './dto/attribute-value.req.dto';
import { AuthRoleGuard } from '@shared/decorators/http.decorator';

@ApiTags('Attribute Value')
@Controller('attribute-values')
export class AttributeValueController {
    constructor(
        private readonly attributeValueService: AttributeValueService,
    ) {}

    @Post()
    @AuthRoleGuard([])
    create(@Body() body: CreateAttributeValueReqDto) {
        return this.attributeValueService.createAttributeValue(body);
    }

    @Get()
    @PublicRoute()
    getAll(@Query() query: GetAttibuteValueReqDto) {
        return this.attributeValueService.getAllAttributeValue(query);
    }

    @Put(':id')
    @AuthRoleGuard([])
    update(@Param('id') id: number, @Body() Body: UpdateAttributeValueReqDto) {
        return this.attributeValueService.updateAttributeValue(id, Body);
    }

    @Delete()
    @AuthRoleGuard([])
    delete(@Query() query: DeleteAttributeValueReqDto) {
        return this.attributeValueService.deleteAttributeValue(query);
    }
}
