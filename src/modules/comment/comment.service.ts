/*
https://docs.nestjs.com/providers#services
*/
import { CommentRepository } from '@models/repositories/comment.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from 'constant/http-error.constant';

import mapDto from '@shared/helpers/mapdto';

import {
    CommentRequestDto,
    DeleteCommentRequestDto,
    GetCommentRequestDto,
} from './dto/comment.req.dto';

@Injectable()
export class CommentService {
    constructor(private readonly commentRepository: CommentRepository) {}

    async getAllComment(query: GetCommentRequestDto) {
        const [result, metadata]: any = await this.commentRepository.getAll(
            query,
        );
        return result.toPageDto(metadata);
    }

    async createComment(body: CommentRequestDto) {
        const payload = mapDto(body, CommentRequestDto);
        // images: convert array to JSON string if needed
        const payloadToSave = {
            ...payload,
            images: payload.images ? JSON.stringify(payload.images) : undefined,
        };
        return await this.commentRepository.save(
            this.commentRepository.create({
                ...payloadToSave,
            }),
        );
    }

    async deleteComment(query: DeleteCommentRequestDto) {
        return await this.commentRepository.delete(query.ids);
    }

    async updateComment(id: number, body: CommentRequestDto) {
        const comment = await this.commentRepository.findOne({
            where: { id },
        });
        if (!comment) {
            throw new HttpException(
                httpErrors.COMMENT_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
        const payload = mapDto(body, CommentRequestDto);
        // images: convert array to JSON string if needed
        const payloadToSave = {
            ...payload,
            images: payload.images ? JSON.stringify(payload.images) : undefined,
        };
        return await this.commentRepository.save({
            ...comment,
            ...payloadToSave,
        });
    }
}
