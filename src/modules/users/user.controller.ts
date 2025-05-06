import { UserEntity } from '@models/entities/user.entity';
import { Body, Controller, Delete, Get, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthUser } from '@shared/decorators/auth-user.decorator';
import { AuthRoleGuard } from '@shared/decorators/http.decorator';

import {
    DeleteUserRequestDto,
    GetUserRequestDto,
    UserRequestDto,
} from './dto/user.req.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/all')
    @AuthRoleGuard([])
    getAll(@Query() query: GetUserRequestDto) {
        return this.userService.getAllUsers(query);
    }

    @Get()
    @AuthRoleGuard([])
    getDetail(@AuthUser() user: UserEntity) {
        return this.userService.findUserById(user.id);
    }

    @Put()
    @AuthRoleGuard([])
    updateUser(@AuthUser() user: UserEntity, @Body() body: UserRequestDto) {
        return this.userService.updateUser(user.id, body);
    }

    @Delete()
    @AuthRoleGuard([])
    deleteUsers(@Query() query: DeleteUserRequestDto) {
        return this.userService.deleteUsers(query);
    }
}
