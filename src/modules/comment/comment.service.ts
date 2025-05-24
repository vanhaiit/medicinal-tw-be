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
import { ProductRepository } from '@models/repositories/product.repository';

@Injectable()
export class CommentService {
    constructor(
        private readonly commentRepository: CommentRepository,
        private readonly productRepository: ProductRepository
    ) {}

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

    async getRateCount(productId: number) {
        const product = await this.productRepository.findOne({
            where: { id: +productId },
        });
        if (!product) {
            throw new HttpException(
                httpErrors.PRODUCT_DOES_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
     const ratingCounts = await this.commentRepository
            .createQueryBuilder('comment')
            .select('comment.rating', 'rating')
            .addSelect('COUNT(*)', 'count')
            .where('comment.rating IS NOT NULL')
            .andWhere('comment.productId = :productId', { productId })
            .groupBy('comment.rating')
            .getRawMany();

        // Initialize result object with 0 counts for all ratings 1-5
        const result = {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
        };

        // Update counts from query results
        ratingCounts.forEach((item) => {
            if (item.rating >= 1 && item.rating <= 5) {
                result[item.rating] = parseInt(item.count);
            }
        });

        return result;
    }
}
