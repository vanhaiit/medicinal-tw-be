import { Repository } from 'typeorm';

export class BaseRepository<T extends { id: number }> extends Repository<T> {
    async insertOrUpdate(entities: T[]): Promise<void> {
        if (entities.length === 0) return;

        const target = entities[0].constructor.name;
        const connection =
            this.createQueryBuilder().connection.getMetadata(target);
        const tableName = connection.tableName;
        const metadataColumns = connection.columns;
        const columnNames = metadataColumns.map(column => column.propertyName);
        const dbColumnNames = new Map<
            string,
            {
                databaseName: string;
                default:
                    | string
                    | number
                    | boolean
                    | (string | number | boolean)[]
                    | Record<string, object>
                    | (() => string);
            }
        >();

        for (const column of metadataColumns) {
            dbColumnNames.set(column.propertyName, {
                databaseName: column.databaseName,
                default: column.default,
            });
        }

        for (const entity of entities) {
            const dbColumns = columnNames.map(
                column => dbColumnNames.get(column).databaseName,
            );
            const entityValues = columnNames.map(column => {
                let value = entity[column];

                if (value === undefined) {
                    const defaultValue = dbColumnNames.get(column).default;
                    value =
                        typeof defaultValue !== 'function' &&
                        defaultValue !== undefined
                            ? defaultValue
                            : null;
                }

                return value;
            });
            const quotedColumns = dbColumns
                .map(column => `\`${column}\``)
                .join(', ');

            let sql = `INSERT INTO \`${tableName}\` (${quotedColumns}) VALUES (${new Array(
                columnNames.length,
            )
                .fill('?')
                .join(', ')})`;

            const valueString = [];

            for (const column of dbColumns) {
                if (
                    column !== 'operation_id' &&
                    (tableName === 'positions' || tableName === 'orders')
                ) {
                    valueString.push(
                        `\`${column}\` = IF(VALUES(operation_id) >= operation_id, VALUES(\`${column}\`), \`${column}\`)`,
                    );
                } else if (column !== 'operation_id') {
                    valueString.push(
                        `\`${column}\` = IF(VALUES(operation_id) > operation_id, VALUES(\`${column}\`), \`${column}\`)`,
                    );
                }
            }

            if (dbColumns.includes('operation_id')) {
                valueString.push(
                    '`operation_id` = IF(VALUES(operation_id) > operation_id, VALUES(`operation_id`), `operation_id`)',
                );
            }

            sql += ` ON DUPLICATE KEY UPDATE ${valueString.join(', ')}`;

            await this.manager.query(sql, entityValues);
        }
    }

    public async findBatch(fromId: number, count: number): Promise<T[]> {
        return this.createQueryBuilder()
            .where('id > :fromId', { fromId })
            .orderBy('id', 'ASC')
            .take(count)
            .getMany();
    }

    public async getLastId(): Promise<number> {
        const order = {};
        order['id'] = 'DESC';
        const entity = await this.find({ order });

        if (entity?.length) {
            return entity[0].id;
        } else {
            return 0;
        }
    }
}
