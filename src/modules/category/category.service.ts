/*
https://docs.nestjs.com/providers#services
*/
import { CategoryRepository } from '@models/repositories/category.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from 'constant/http-error.constant';

import mapDto from '@shared/helpers/mapdto';

import {
    CategoryRequestDto,
    DeleteCategoryRequestDto,
    GetCategoryRequestDto,
} from './dto/category.req.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository) {}

    async getAllCategory(query: GetCategoryRequestDto) {
        const [result, metadata]: any = await this.categoryRepository.getAll(
            query,
        );
        return result.toPageDto(metadata);
    }

    async createCategory(body: CategoryRequestDto) {
        const payload = mapDto(body, CategoryRequestDto);
        return await this.categoryRepository.save(
            this.categoryRepository.create({
                ...payload,
            }),
        );
    }

    async deleteCategory(query: DeleteCategoryRequestDto) {
        return await this.categoryRepository.delete(query.ids);
    }

    async updateCategory(id: number, body: CategoryRequestDto) {
        const media = await this.categoryRepository.findOne({ where: { id } });
        if (!media) {
            throw new HttpException(
                httpErrors.CATEGORY_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
        const payload = mapDto(body, CategoryRequestDto);
        return await this.categoryRepository.save({
            ...media,
            ...payload,
        });
    }
}
