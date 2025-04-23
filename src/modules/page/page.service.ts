/*
https://docs.nestjs.com/providers#services
*/
import { PageDetailRepository } from '@models/repositories/page-detail.repository';
import { PageRepository } from '@models/repositories/page.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from 'constant/http-error.constant';
import { Transactional } from 'typeorm-transactional';

import { JwtPayloadDto } from '@shared/dtos/jwt-payload.dto';
import mapDto from '@shared/helpers/mapdto';

import {
    CreatePageRequestDto,
    GetPageRequestDto,
    UpdatePageRequestDto,
} from './dtos/page.request.dto';
import { EPageStatus } from 'constant/page.constant';

@Injectable()
export class PageService {
    constructor(
        private readonly pageRepository: PageRepository,
        private readonly pageDetailRepository: PageDetailRepository,
    ) {}
    async findPageById(id: string) {
        const page = await this.pageRepository.getPageWithId(id);
        if (!page) {
            throw new HttpException(
                httpErrors.PAGE_DOES_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
        return page;
    }

    async getAll(query: GetPageRequestDto) {
        const [result, metadata]: any = await this.pageRepository.getAllPage(
            query,
        );
        return result.toPageDto(metadata);
    }

    @Transactional()
    async createPage(body: CreatePageRequestDto, user: JwtPayloadDto) {
        const payload = mapDto(body, CreatePageRequestDto);
        const page = await this.pageRepository.save(
            this.pageRepository.create({
                ...payload,
                authors: user.email,
                creator: user.email,
                publisher: EPageStatus.DRAFT,
            }),
        );

        const detailPage = await this.pageDetailRepository.save(
            this.pageDetailRepository.create({
                pageId: page.id,
                content: payload.content,
            }),
        );

        return { info: page, detail: detailPage };
    }

    @Transactional()
    async updatePage(body: UpdatePageRequestDto, id: string) {
        const { content, ...pagePayload } = body;
        const page = await this.pageRepository.getPageWithId(id);
        if (!page) {
            throw new HttpException(
                httpErrors.PAGE_DOES_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
        if (!!body?.content) {
            const pageDetail = await this.pageDetailRepository.findOne({
                where: {
                    pageId: page.id,
                },
            });
            await this.pageDetailRepository.save({
                ...pageDetail,
                content: JSON.parse(content),
            });
        }
        await this.pageRepository.save({ ...page, ...pagePayload });
        if (!!body.content) page.detail.content = JSON.parse(body?.content);
        return page;
    }

    @Transactional()
    async deletePage(id: string) {
        const page = await this.pageRepository.getPageWithId(id);
        if (!page) {
            throw new HttpException(
                httpErrors.PAGE_DOES_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
        await this.pageRepository.delete(id);
        await this.pageDetailRepository.delete(page.detail.id);
        return;
    }
}
