import { UserEntity } from '@models/entities/user.entity';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthUser } from '@shared/decorators/auth-user.decorator';
import { AuthRoleGuard } from '@shared/decorators/http.decorator';

import {
    CreateUserRequestDto,
    DeleteUserRequestDto,
    GetUserRequestDto,
    UserRequestDto,
} from './dto/user.req.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @AuthRoleGuard(['admin'])
    createUser(@Body() body: CreateUserRequestDto) {
        return this.userService.createUser(body);
    }

    @Get('/all')
    @AuthRoleGuard(['employee'])
    getAll(@Query() query: GetUserRequestDto) {
        return this.userService.getAllUsers(query);
    }

    @Get(':id')
    @AuthRoleGuard([])
    getDetail(@Param('id') id: number, @AuthUser() user: UserEntity) {
        return this.userService.findUserById(id || user.id);
    }

    @Put(':id')
    @AuthRoleGuard(['admin'])
    updateUser(
        @Param('id') id: number,
        @AuthUser() user: UserEntity,
        @Body() body: UserRequestDto,
    ) {
        return this.userService.updateUser(id || user.id, body);
    }

    @Delete()
    @AuthRoleGuard(['admin'])
    deleteUsers(@Query() query: DeleteUserRequestDto) {
        return this.userService.deleteUsers(query);
    }
}
