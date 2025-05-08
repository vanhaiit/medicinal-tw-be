export class JwtPayloadDto {
    id: number;
    roles: any;
    email: string;
    iat: number;
    exp: number;
}
