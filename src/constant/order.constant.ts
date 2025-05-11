export enum EOrderStatus {
    pending = 'pending',
    processing = 'processing',
    completed = 'completed',
    cancelled = 'cancelled',
}

export enum EOrderPaymentMethod {
    cash = 1,
    creditCard = 2,
    bankTransfer = 3,
}
