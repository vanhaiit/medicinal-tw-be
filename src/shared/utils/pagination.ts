import { PaginationDto } from '@shared/dtos/page-meta.dto';
import { IResponseWithPagination } from '@shared/dtos/response.dto';

export const formatWithPagination = (
    data,
    paginationDto: PaginationDto,
    totalItems: number,
): IResponseWithPagination => {
    return {
        data: data,
        meta: {
            total_item: totalItems,
            total_page: Math.ceil(totalItems / paginationDto.limit) || 1,
            current_page: Number(paginationDto.page) || 1,
            item_per_page: Number(paginationDto.limit),
        },
    };
};
