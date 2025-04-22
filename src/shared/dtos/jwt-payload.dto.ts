export class JwtPayloadDto {
    id: number;
    roles: any;
    email: string;
    isAdmin: boolean;
    iat: number;
    exp: number;
}
