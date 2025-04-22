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

import {
    DeleteFinderRequestDto,
    FinderRequestDto,
    GetFinderRequestDto,
} from './dto/finder.request.dto';
import { FinderService } from './finder.service';

@ApiTags('Finder')
@Controller('finder')
export class FinderController {
    constructor(private readonly finderService: FinderService) {}

    @Get()
    @PublicRoute()
    getAll(@Query() query: GetFinderRequestDto) {
        return this.finderService.getAllFinder(query);
    }

    @Post()
    @PublicRoute()
    async createFinder(@Body() body: FinderRequestDto) {
        return await this.finderService.createFinder(body);
    }

    @Put('/:id')
    @PublicRoute()
    updateMedia(@Param('id') id: number, @Body() body: FinderRequestDto) {
        return this.finderService.updateFinder(id, body);
    }

    @Delete('')
    @PublicRoute()
    deleteMedia(@Query() query: DeleteFinderRequestDto) {
        return this.finderService.deleteFinder(query.ids);
    }
}
