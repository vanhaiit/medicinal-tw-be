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

import {
    DeletePostRequestDto,
    GetPostRequestDto,
    PostRequestDto,
} from './dto/post.req.dto';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    @PublicRoute()
    getAll(@Query() query: GetPostRequestDto) {
        return this.postService.getAllPost(query);
    }

    @Delete()
    @AuthRoleGuard([])
    delete(@Query() query: DeletePostRequestDto) {
        return this.postService.deletePost(query);
    }

    @Put(':id')
    @AuthRoleGuard([])
    update(@Param('id') id: number, @Body() body: PostRequestDto) {
        return this.postService.updatePost(id, body);
    }

    @Post()
    @AuthRoleGuard([])
    createPost(@Body() body: PostRequestDto) {
        return this.postService.createPost(body);
    }
}
