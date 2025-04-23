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
import { AuthUser } from '@shared/decorators/auth-user.decorator';
import { AuthRoleGuard } from '@shared/decorators/http.decorator';
import { PublicRoute } from '@shared/decorators/public-route.decorator';
import { JwtPayloadDto } from '@shared/dtos/jwt-payload.dto';

import {
    CreatePageRequestDto,
    GetPageRequestDto,
    UpdatePageRequestDto,
} from './dtos/page.request.dto';
import {
    CreatePageResponseDto,
    GetPageResponseDto,
} from './dtos/pate.response.dto';
import { PageService } from './page.service';

@ApiTags('Page')
@Controller('page')
export class PageController {
    constructor(private readonly pageService: PageService) {}

    @Get()
    @PublicRoute()
    @ApiPageOkResponse({ type: GetPageResponseDto, metadata: true })
    getAll(@Query() query: GetPageRequestDto) {
        return this.pageService.getAll(query);
    }

    @Get(':id')
    @PublicRoute()
    @ApiPageOkResponse({ type: GetPageResponseDto })
    getPageById(@Param('id') id: string) {
        return this.pageService.findPageById(id);
    }

    @Post()
    @AuthRoleGuard([])
    @ApiPageOkResponse({ type: CreatePageResponseDto })
    createPage(
        @AuthUser() user: JwtPayloadDto,
        @Body() body: CreatePageRequestDto,
    ) {
        return this.pageService.createPage(body, user);
    }

    @Put(':id')
    @AuthRoleGuard([])
    @ApiPageOkResponse({ type: CreatePageResponseDto })
    updatePage(@Body() body: UpdatePageRequestDto, @Param('id') id: string) {
        return this.pageService.updatePage(body, id);
    }

    @Delete(':id')
    @AuthRoleGuard([])
    @ApiPageOkResponse({ type: CreatePageResponseDto })
    deletePage(@Param('id') id: string) {
        return this.pageService.deletePage(id);
    }
}
