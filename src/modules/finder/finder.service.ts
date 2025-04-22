/*
https://docs.nestjs.com/providers#services
*/
import { FinderRepository } from '@models/repositories/finder.responsitoy';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from 'constant/http-error.constant';
import { existsSync, promises as fsPromises, mkdirSync } from 'fs';
import { resolve } from 'path';
import { In } from 'typeorm';

import mapDto from '@shared/helpers/mapdto';

import {
    FinderRequestDto,
    GetFinderRequestDto,
} from './dto/finder.request.dto';

@Injectable()
export class FinderService {
    constructor(private readonly finderRepository: FinderRepository) {}

    replaceSpecialCharacters(input: string, replaceWith = ''): string {
        // Regular expression to match all non-alphanumeric characters
        const specialCharsRegex = /[^a-zA-Z0-9]/g;
        // Replace the special characters with the provided replacement character or an empty string
        return input.replace(specialCharsRegex, replaceWith);
    }

    async getFinder(id: number) {
        const finder = await this.finderRepository.findOne({ where: { id } });
        if (!finder?.id) {
            throw new HttpException(
                httpErrors.FOLDER_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
        return finder;
    }

    async getAllFinder(query: GetFinderRequestDto) {
        const [result, metadata]: any =
            await this.finderRepository.getAllFinder(query);
        return result.toPageDto(metadata);
    }

    async createFinder(body: FinderRequestDto) {
        const shortcut = this.replaceSpecialCharacters(body.name, '_');
        const uploadPath = resolve(
            __dirname,
            `../../../../uploads/${shortcut}`,
        );
        if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
        } else {
            throw new HttpException(
                httpErrors.FINDER_EXIST,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        const item = await this.finderRepository.save(
            this.finderRepository.create({ ...body, shortcut }),
        );
        return item;
    }

    async updateFinder(id: number, body: FinderRequestDto) {
        const finder = await this.finderRepository.findOne({ where: { id } });
        if (!finder?.id) {
            throw new HttpException(
                httpErrors.FINDER_NOT_EXIST,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
        const payload = mapDto(body, FinderRequestDto);
        const newShortcut = this.replaceSpecialCharacters(payload.name, '_');
        const oldShortcut = finder.shortcut;

        const oldPath = resolve(__dirname, `../../../../${oldShortcut}`);
        const newPath = resolve(__dirname, `../../../../${newShortcut}`);

        if (existsSync(oldPath)) {
            try {
                // Rename the directory using fs.promises.rename for async behavior
                await fsPromises.rename(oldPath, newPath);
            } catch (error) {
                throw new HttpException(
                    'Error renaming folder',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }

        const item = await this.finderRepository.save({
            ...finder,
            ...payload,
            shortcut: newShortcut,
        });
        return item;
    }

    async deleteFinder(ids: number[]) {
        const finders = await this.finderRepository.find({
            where: { id: In(ids) },
        });
        const payload = finders.map(e => ({
            ...e,
            deletedAt: new Date(),
        }));
        return await this.finderRepository.save(payload);
    }
}
