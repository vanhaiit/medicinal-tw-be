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

import { CommentService } from './comment.service';
import {
    CommentRequestDto,
    DeleteCommentRequestDto,
    GetCommentRequestDto,
} from './dto/comment.req.dto';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get()
    @PublicRoute()
    getAll(@Query() query: GetCommentRequestDto) {
        return this.commentService.getAllComment(query);
    }

    @Delete()
    @AuthRoleGuard([])
    delete(@Query() query: DeleteCommentRequestDto) {
        return this.commentService.deleteComment(query);
    }

    @Put(':id')
    @AuthRoleGuard([])
    update(@Param('id') id: number, @Body() body: CommentRequestDto) {
        return this.commentService.updateComment(id, body);
    }

    @Post()
    @AuthRoleGuard([])
    createComment(@Body() body: CommentRequestDto) {
        return this.commentService.createComment(body);
    }

    @Get('rate-count/:productId')
    @PublicRoute()
    getRateCount(@Query('productId') productId: number) {
        return this.commentService.getRateCount(productId);
    }
}
