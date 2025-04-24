/*
https://docs.nestjs.com/providers#services
*/
import { AttributeRepository } from '@models/repositories/attribute.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from 'constant/http-error.constant';

import mapDto from '@shared/helpers/mapdto';

import {
    CreateAttributeReqDto,
    DeleteAttributeReqDto,
    GetAttibuteReqDto,
} from './dto/attribute.req.dto';

@Injectable()
export class AttributeService {
    constructor(private readonly attributeRepository: AttributeRepository) {}

    async getAllAttribute(query: GetAttibuteReqDto) {
        const [result, metadata]: any = await this.attributeRepository.getAll(
            query,
        );
        return result.toPageDto(metadata);
    }

    async createAttribute(body: CreateAttributeReqDto) {
        const payload = mapDto(body, CreateAttributeReqDto);
        return await this.attributeRepository.save(
            this.attributeRepository.create({
                ...payload,
            }),
        );
    }

    async updateAttribute(id: number, body: CreateAttributeReqDto) {
        const attribute = await this.attributeRepository.findOne({
            where: { id },
        });
        if (!attribute) {
            throw new HttpException(
                httpErrors.ATTRIBUTE_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
        const payload = mapDto(body, CreateAttributeReqDto);
        return await this.attributeRepository.save({
            ...attribute,
            ...payload,
        });
    }

    async deleteAttribute(query: DeleteAttributeReqDto) {
        return await this.attributeRepository.delete(query.ids);
    }
}
