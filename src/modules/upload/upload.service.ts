import { UploadRepository } from '@models/repositories/upload.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { httpErrors } from 'constant/http-error.constant';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { In } from 'typeorm';

import {
    GetUploadRequestDto,
    UploadRequestDto,
} from './dto/upload.request.dto';

@Injectable()
export class UploadService {
    private uploadPath: string;

    constructor(private readonly uploadRepository: UploadRepository) {
        this.uploadPath = resolve(__dirname, '../../../../uploads');

        if (!existsSync(this.uploadPath)) {
            mkdirSync(this.uploadPath, { recursive: true });
        }
    }

    async saveFile(
        file: Express.Multer.File,
        folder: any,
        index: number,
    ): Promise<string> {
        this.uploadPath = resolve(__dirname, '../../../../uploads');
        if (!file || !file.buffer) {
            throw new HttpException(
                httpErrors.FOLDER_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }
        const time = new Date().getTime();
        const temp = file.originalname.split('.');
        const type = temp[temp.length - 1];
        this.uploadPath += '/' + folder + '/';
        const filePath = join(`${this.uploadPath}${time}_${index}.${type}`);

        try {
            writeFileSync(filePath, file.buffer);
            return `/uploads/${folder}/${time}_${index}.${type}`;
        } catch (error) {
            throw new HttpException(
                httpErrors.UPLOAD_ERROR,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async createFile(body: UploadRequestDto[]) {
        const items = await this.uploadRepository.save(
            this.uploadRepository.create(body),
        );
        return items;
    }

    async deleteFile(ids: number[]): Promise<any> {
        this.uploadPath = resolve(__dirname, '../../../../uploads');
        // Fetch file details from the database for the given ids
        const filesToDelete = await this.uploadRepository.find({
            where: { id: In(ids) }, // Use the In operator to find multiple ids
        });

        if (!filesToDelete || filesToDelete.length === 0) {
            throw new HttpException('Files not found', HttpStatus.NOT_FOUND);
        }

        // Try deleting files from the filesystem
        for (const file of filesToDelete) {
            const path = file.url.split('/uploads/')[1];
            const filePath = join(this.uploadPath, path); // Assuming the file entity has fileName property
            if (existsSync(filePath)) {
                try {
                    unlinkSync(filePath); // Delete file
                } catch (error) {
                    throw new HttpException(
                        `Failed to delete file: ${path}`,
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
                }
            } else {
                throw new HttpException(
                    `File not found on server: ${path}`,
                    HttpStatus.NOT_FOUND,
                );
            }
        }

        // If file deletion succeeds, delete the database entries
        return await this.uploadRepository.delete(ids);
    }

    async getAllFile(query: GetUploadRequestDto) {
        const [result, metadata]: any = await this.uploadRepository.getAllFile(
            query,
        );
        return result.toPageDto(metadata);
    }
}
