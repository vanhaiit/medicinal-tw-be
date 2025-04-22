import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FinderService } from '@modules/finder/finder.service';

import { AuthRoleGuard } from '@shared/decorators/http.decorator';
import { PublicRoute } from '@shared/decorators/public-route.decorator';

import {
    DeleteMediaUploadDto,
    FileUploadRequestDto,
    GetUploadRequestDto,
} from './dto/upload.request.dto';
import { UploadService } from './upload.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
    constructor(
        private readonly uploadService: UploadService,
        private readonly finderService: FinderService,
    ) {}

    @Post(':finderId')
    @UseInterceptors(FilesInterceptor('files', 10)) // 'files' is the field name, and 10 is the max number of files
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Files uploaded successfully.',
        type: [FileUploadRequestDto], // Expecting an array of responses
    })
    @PublicRoute()
    async uploadFiles(
        @UploadedFiles() files: Express.Multer.File[],
        @Param('finderId') finderId: number,
    ): Promise<any> {
        const finder = await this.finderService.getFinder(finderId);
        const fileUploadResponses = await Promise.all(
            files.map(async (file, index: number) => {
                const filePath = await this.uploadService.saveFile(
                    file,
                    finder.shortcut,
                    index,
                );
                return { filePath };
            }),
        );
        if (fileUploadResponses?.length > 0) {
            const payload = fileUploadResponses.map(e => ({
                url: e.filePath,
                finderId: finder.id,
            }));
            return await this.uploadService.createFile(payload);
        }
        return fileUploadResponses;
    }

    @Delete('')
    @AuthRoleGuard([])
    deleteUpload(@Query() query: DeleteMediaUploadDto) {
        return this.uploadService.deleteFile(query.ids);
    }

    @Get()
    @AuthRoleGuard([])
    getAll(@Query() query: GetUploadRequestDto) {
        return this.uploadService.getAllFile(query);
    }
}
