import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
    data: T;
    metadata?: {
        totalPage?: number;
        [key: string]: unknown;
    };
}

export interface IResponseWithPagination {
    data: any;
    meta: IPaginationMetadata;
}

export interface IPaginationMetadata {
    total_item: number;
    item_per_page: number;
    current_page: number;
    total_page: number;
}

export class CommonResDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
