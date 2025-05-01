import { CommentEntity } from '@models/entities/comment.entity';
import { SortOrder } from 'constant/pagination.constant';

import { GetCommentRequestDto } from '@modules/comment/dto/comment.req.dto';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';

import { BaseRepository } from './base.repository';

@CustomRepository(CommentEntity)
export class CommentRepository extends BaseRepository<CommentEntity> {
    async getAll(options?: GetCommentRequestDto) {
        const query = this.createQueryBuilder('comment');

        if (options?.search) {
            query.andWhere(`LOWER(comment.content) LIKE LOWER(:search)`, {
                search: `%${options.search.toLowerCase()}%`,
            });
        }

        if (options?.productId) {
            query.andWhere('comment.productId = :productId', {
                productId: options.productId,
            });
        }

        if (options?.rating) {
            query.andWhere('comment.rating = :rating', {
                rating: options.rating,
            });
        }

        // Always order by createdAt, as per DTO
        query.orderBy(
            'comment.createdAt',
            options?.direction || SortOrder.DESC,
        );

        if (!!options) {
            const { limit, page, skip } = options;
            const pageOption = { page, limit, skip } as PageOptionsDto;
            return query.paginate(pageOption);
        }

        return query.getMany();
    }

    async getCommentByProductId(
        productId: number,
    ): Promise<{ avgRating: number | null; totalComments: number }> {
        const res = await this.createQueryBuilder('comment')
            .select('AVG(comment.rating)', 'avgRating')
            .addSelect('COUNT(comment.id)', 'totalComments')
            .where('comment.productId = :productId', { productId })
            .getRawOne();

        return {
            avgRating: res?.avgRating ? Number(res.avgRating) : null,
            totalComments: res?.totalComments ? Number(res.totalComments) : 0,
        };
    }
}
