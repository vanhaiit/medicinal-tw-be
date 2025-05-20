import { UserEntity } from '@models/entities/user.entity';
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

import { AuthUser } from '@shared/decorators/auth-user.decorator';
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

    @Get(':id')
    @PublicRoute()
    getDetail(@Param('id') id: string) {
        let condition: { id?: number; slug?: string } = {};
        if (typeof id === 'number' || !isNaN(Number(id))) {
            condition = { id: Number(id) };
        } else {
            condition = { slug: id };
        }
        return this.postService.getPostDetail(condition.id, condition.slug);
    }

    @Delete()
    @AuthRoleGuard(['employee'])
    delete(@Query() query: DeletePostRequestDto) {
        return this.postService.deletePost(query);
    }

    @Put(':id')
    @AuthRoleGuard(['employee'])
    update(@Param('id') id: number, @Body() body: PostRequestDto) {
        return this.postService.updatePost(id, body);
    }

    @Post()
    @AuthRoleGuard(['employee'])
    createPost(@AuthUser() user: UserEntity, @Body() body: PostRequestDto) {
        return this.postService.createPost({ ...body, userId: user.id });
    }
}
