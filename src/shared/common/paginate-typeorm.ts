import { Brackets, QueryBuilder, SelectQueryBuilder } from 'typeorm';

import { PageMetaDto } from '@shared/dtos/page-meta.dto';
import { PageOptionsDto } from '@shared/dtos/page-options.dto';
import { PageDto } from '@shared/dtos/page.dto';
import { transformQuery } from '@shared/utils/transform-query';

declare global {
    interface Array<T> {
        toPageDto<Dto extends T>(this: T[], pageMetaDto: PageMetaDto): PageDto<Dto>;
    }
}

declare module 'typeorm' {
    interface QueryBuilder<Entity> {
        searchByString(q: string, columnNames: string[]): this;
        fullGroupBy(columnNames: string[]): this;
    }

    interface SelectQueryBuilder<Entity> {
        paginate(this: SelectQueryBuilder<Entity>, pageOptions: PageOptionsDto): Promise<[Entity[], PageMetaDto]>;
        paginateRaw<T = any>(
            this: SelectQueryBuilder<Entity>,
            pageOptions: PageOptionsDto,
        ): Promise<[T[], PageMetaDto]>;
        paginateCountRaw<T>(this: SelectQueryBuilder<Entity>, pageOptions: PageOptionsDto): Promise<[T[], PageMetaDto]>;
        paginateRawAndEntities(
            this: SelectQueryBuilder<Entity>,
            pageOptions: PageOptionsDto,
        ): Promise<[[Entity[], PageMetaDto], any[]]>;
        getSqlFilledParameters(this: SelectQueryBuilder<Entity>): string;
    }
}

Array.prototype.toPageDto = function (pageMetaDto: PageMetaDto) {
    return new PageDto(this, pageMetaDto);
};

QueryBuilder.prototype.searchByString = function (q, columnNames) {
    if (!q) {
        return this;
    }

    this.andWhere(
        new Brackets(qb => {
            for (const item of columnNames) {
                qb.orWhere(`LOWER(${item}) LIKE :q`);
            }
        }),
    );

    this.setParameter('q', `%${transformQuery(q.toString())}%`);

    return this;
};

SelectQueryBuilder.prototype.paginate = async function (pageOptions: PageOptionsDto) {
    const alias = this.expressionMap.mainAlias.name;
    if (pageOptions?.page && pageOptions?.limit) {
        this.skip(pageOptions.skip).take(pageOptions.limit);
    }

    if (pageOptions?.orderBy) {
        this.addOrderBy(alias + '.' + pageOptions.orderBy, pageOptions?.direction ?? 'ASC');
    }

    const [items, itemCount] = await this.getManyAndCount();
    const pageMetaDto = new PageMetaDto(pageOptions, itemCount);

    return [items, pageMetaDto];
};

SelectQueryBuilder.prototype.paginateRaw = async function (pageOptions: PageOptionsDto) {
    const alias = this.expressionMap.mainAlias.name;

    if (pageOptions?.page && pageOptions?.limit) {
        this.offset(pageOptions.skip).limit(pageOptions.limit);
    }

    if (pageOptions?.orderBy) {
        this.addOrderBy(alias + '.' + pageOptions.orderBy, pageOptions?.direction ?? 'ASC');
    }

    const [items, itemCount] = await Promise.all([this.getRawMany(), this.getCount()]);
    const pageMetaDto = new PageMetaDto(pageOptions, itemCount);

    return [items, pageMetaDto];
};

SelectQueryBuilder.prototype.paginateRawAndEntities = async function (pageOptions: PageOptionsDto) {
    const alias = this.expressionMap.mainAlias.name;
    if (pageOptions?.page && pageOptions?.limit) {
        this.offset(pageOptions.skip).limit(pageOptions.limit);
    }

    if (pageOptions?.orderBy) {
        this.addOrderBy(alias + '.' + pageOptions.orderBy, pageOptions?.direction ?? 'ASC');
    }

    const [items, itemCount] = await Promise.all([this.getRawAndEntities(), this.getCount()]);
    const pageMetaDto = new PageMetaDto(pageOptions, itemCount);

    return [[items.entities, pageMetaDto], items.raw];
};

QueryBuilder.prototype.fullGroupBy = function (columnNames) {
    columnNames.forEach((columnName, index) => {
        if (index === 0) {
            this.groupBy(columnName);
        } else {
            this.addGroupBy(columnName);
        }
    });

    return this;
};

SelectQueryBuilder.prototype.getSqlFilledParameters = function () {
    let [sql, params] = this.getQueryAndParameters();
    let index = 1;

    while (sql.includes(`$${index}`)) {
        const value = params[index - 1];
        const placeholder = new RegExp(`\\$${index}\\b`, 'g'); // Add 'g' flag to match all occurrences

        if (value === undefined || value === null) {
            sql = sql.replace(placeholder, `null`);
        } else if (typeof value === 'string') {
            sql = sql.replace(placeholder, `'${value}'`);
        } else if (typeof value === 'object') {
            if (Array.isArray(value)) {
                sql = sql.replace(
                    placeholder,
                    value.map(element => (typeof element === 'string' ? `'${element}'` : element)).join(','),
                );
            } else {
                sql = sql.replace(placeholder, value);
            }
        } else if (['number', 'boolean'].includes(typeof value)) {
            sql = sql.replace(placeholder, value.toString());
        }

        index++;
    }

    return sql;
};
