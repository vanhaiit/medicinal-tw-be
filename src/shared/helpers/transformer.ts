import { TransformationType } from 'class-transformer';
import { TransformFnParams } from 'class-transformer/types/interfaces';
import { EItemType } from 'constant/item.constant';

export const dateTransformer = ({
    value,
    type,
}: TransformFnParams): unknown => {
    if (!value) {
        return;
    }

    if (type === TransformationType.CLASS_TO_PLAIN) {
        return value.getTime();
    } else {
        return new Date(value);
    }
};

export const handleFormatData = (data: any) => {
    const { orderItems } = data;

    const dataItems = orderItems.filter((x: any) => !x.parentItemId);

    orderItems.forEach((e: any) => {
        const parent = dataItems.find((i: any) => i.itemId === e.parentItemId);
        if (parent) {
            if (parent?.item?.type !== EItemType.physical) {
                parent.item.price += e.item.servicePrice || 0;
            }
            parent.subItems = [...(parent.subItems || []), e];
        }
    });

    if (data?.voucher?.discountType) {
        data.voucher.discountAmount = getDiscountAmount(
            data?.voucher?.discountType,
            data?.voucher?.discountValue,
            data?.amount,
        );
    }

    return {
        ...data,
        orderItems: dataItems,
    };
};

const getDiscountAmount = (
    discountType: string,
    discountValue: number,
    amount: number,
) => {
    switch (discountType?.toLocaleUpperCase()) {
        case 'PERCENTAGE':
            return amount * (Number(discountValue) / 100);
        default:
            return Number(discountValue);
    }
};
