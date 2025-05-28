export enum EOrderStatus {
    pending = 'pending',
    pay = 'pay',
    deliver = 'deliver',
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

export enum EOrderPaymentStatus {
    pending = 0,
    payed = 1,
    payFailed = 2,
}
