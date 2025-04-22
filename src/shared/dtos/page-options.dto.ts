import { SortOrder } from 'constant/pagination.constant';

import {
    EnumFieldOptional,
    NumberFieldOption,
    StringFieldOption,
} from '@shared/decorators/field.decorator';

export class PageOptionsDto<TOrderBy = string> {
    @StringFieldOption()
    readonly orderBy: TOrderBy;

    @EnumFieldOptional(() => SortOrder, {
        default: SortOrder.ASC,
    })
    readonly direction: SortOrder = SortOrder.ASC;

    @NumberFieldOption({
        minimum: 1,
        default: 1,
        int: true,
    })
    readonly page: number;

    @NumberFieldOption({
        minimum: 1,
        maximum: 50,
        default: 10,
        int: true,
    })
    readonly limit: number;

    get skip(): number {
        return (this.page - 1) * this.limit;
    }
}
