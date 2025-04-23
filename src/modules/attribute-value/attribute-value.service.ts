import { AttributeValueRepository } from '@models/repositories/attribute-value.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from 'constant/http-error.constant';

import mapDto from '@shared/helpers/mapdto';

import {
    CreateAttributeValueReqDto,
    DeleteAttributeValueReqDto,
    GetAttibuteValueReqDto,
    UpdateAttributeValueReqDto,
} from './dto/attribute-value.req.dto';

@Injectable()
export class AttributeValueService {
    constructor(
        private readonly attributeValueRepository: AttributeValueRepository,
    ) {}

    async createAttributeValue(body: CreateAttributeValueReqDto) {
        const payload = mapDto(body, CreateAttributeValueReqDto);
        return await this.attributeValueRepository.save(
            this.attributeValueRepository.create({
                ...payload,
            }),
        );
    }

    async getAllAttributeValue(query: GetAttibuteValueReqDto) {
        const [result, metadata]: any =
            await this.attributeValueRepository.getAll(query);
        return result.toPageDto(metadata);
    }

    async updateAttributeValue(id: number, body: UpdateAttributeValueReqDto) {
        const attribute = await this.attributeValueRepository.findOne({
            where: { id },
        });
        if (!attribute) {
            throw new HttpException(
                httpErrors.ATTRIBUTE_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
        const payload = mapDto(body, UpdateAttributeValueReqDto);
        return await this.attributeValueRepository.save({
            ...attribute,
            ...payload,
        });
    }

    async deleteAttributeValue(query: DeleteAttributeValueReqDto) {
        return await this.attributeValueRepository.delete(query.ids);
    }
}
