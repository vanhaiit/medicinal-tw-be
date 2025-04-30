/*
https://docs.nestjs.com/providers#services
*/
import { PostRepository } from '@models/repositories/post.responsitory';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from 'constant/http-error.constant';

import mapDto from '@shared/helpers/mapdto';

import {
    PostRequestDto,
    DeletePostRequestDto,
    GetPostRequestDto,
} from './dto/post.req.dto';

@Injectable()
export class PostService {
    constructor(private readonly postRepository: PostRepository) {}

    async getAllPost(query: GetPostRequestDto) {
        const [result, metadata]: any = await this.postRepository.getAll(
            query,
        );
        return result.toPageDto(metadata);
    }

    async createPost(body: PostRequestDto) {
        const payload = mapDto(body, PostRequestDto);
        return await this.postRepository.save(
            this.postRepository.create({
                ...payload,
            }),
        );
    }

    async deletePost(query: DeletePostRequestDto) {
        return await this.postRepository.delete(query.ids);
    }

    async updatePost(id: number, body: PostRequestDto) {
        const post = await this.postRepository.findOne({
            where: { id },
        });
        if (!post) {
            throw new HttpException(
                httpErrors.POST_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
        const payload = mapDto(body, PostRequestDto);
        return await this.postRepository.save({
            ...post,
            ...payload,
        });
    }
} 