export enum EUserSocketEvent {
    HOLD_PENDING = 'hold_pending',
    HOLD_SUCCEEDED = 'hold_succeeded',
    HOLD_FAILED = 'hold_failed',
    MINT_TICKET_SUCCEEDED = 'mint_ticket_succeeded',
    PAID_HOLD_TICKET = 'paid_hold_ticket',
    NOTIFICATIONS = 'notifications',
    OPEN_BOX = 'open_box',
    CANCEL_ORDER = 'cancel_order',
    FULFILL_ORDER = 'fulfill_order',
    CRAFTING = 'crafting',
    BUY_TOKEN_SUCCESSFULLY = 'buy_token_successfully',
    PRE_ORDER = 'pre_order',
    ALLOWED_ORDER = 'allowed_order',
}
export enum ETeamSocketEvent {
    ORGANIZER_REPUBLISH_EVENT = 'organizer_republish_event',
    ADMIN_DEPLOY_POOL = 'admin_deploy_pool',
    ADMIN_APPROVE_REPUBLISH = 'admin_approve_republish',
}
export enum ENotificationEvent {
    ALL = 'ALL',
}
