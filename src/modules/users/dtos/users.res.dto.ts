import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UserIsLocked, UserRole, UserStatus } from 'constant/user.constant';

class RoleDto {
    @ApiProperty()
    @Expose()
    type: UserRole;
}

export class GetUsersResDto {
    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    username: string;

    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty()
    @Expose()
    isLocked: UserIsLocked;

    @ApiProperty()
    @Expose()
    status: UserStatus;

    @ApiProperty()
    @Expose()
    createdAt: Date;

    @Expose()
    @ApiProperty()
    @Type(() => RoleDto)
    @ValidateNested()
    roles: RoleDto;
}
