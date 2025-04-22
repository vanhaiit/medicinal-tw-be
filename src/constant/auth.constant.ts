export enum EAuthError {
    TOKEN_INVALID = 'TOKEN_INVALID',
    SIGNATURE_INVALID = 'SIGNATURE_INVALID',
}

// 7 days for testing
// time in second
export const JWT_ACCESS_TOKEN_TIMEOUT = 7 * 24 * 60 * 60;
export const JWT_REFRESH_TOKEN_TIMEOUT = 7 * 24 * 60 * 60;
