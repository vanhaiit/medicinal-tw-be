import { PostEntity } from '@models/entities/post.entity';

import { GetPostRequestDto } from '@modules/post/dto/post.req.dto';

import { CustomRepository } from '@shared/decorators/typeorm-ex.decorator';

import { BaseRepository } from './base.repository';

@CustomRepository(PostEntity)
export class PostRepository extends BaseRepository<PostEntity> {
    async getAll(options?: GetPostRequestDto) {
        const query = this.createQueryBuilder('post')
            .leftJoinAndSelect('post.category', 'category')
            .leftJoinAndSelect('post.user', 'user'); // Changed from categories to category

        if (options?.search) {
            query.andWhere(`LOWER(post.title) LIKE LOWER(:search)`, {
                search: `%${options.search.toLowerCase()}%`,
            });
        }

        if (options?.categoryIds && options.categoryIds.length > 0) {
            query.andWhere('category.id IN (:...categoryIds)', {
                // Changed from categories to category
                categoryIds: options.categoryIds,
            });
        }

        if (options?.status) {
            query.andWhere(`post.status = :status`, { status: options.status });
        }

        if (options?.orderBy) {
            query.orderBy(
                `post.${options.orderBy}`,
                options.direction || 'DESC',
            );
        }

        if (!!options) {
            return query.paginate(options);
        }

        return query.getMany();
    }

    async getDetail(identifier: number | string) {
        const query = this.createQueryBuilder('post')
            .leftJoinAndSelect('post.category', 'category')
            .leftJoinAndSelect('post.user', 'user')
            .where(
                typeof identifier === 'number'
                    ? 'post.id = :identifier'
                    : 'post.slug = :identifier',
                { identifier },
            );
        return query.getOne();
    }
}
