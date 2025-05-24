export enum EOrderStatus {
    pending = 'pending',
    processing = 'processing',
    completed = 'completed',
    cancelled = 'cancelled',
}

export enum EOrderShippingBranch {
    ghn = 'GHN',
    ghtk = 'GHTK',
    vettel = 'VIETTEL',
    vnpost = 'VNPOST'
}

export enum EOrderPaymentMethod {
    cash = 1,
    creditCard = 2,
    bankTransfer = 3,
}
