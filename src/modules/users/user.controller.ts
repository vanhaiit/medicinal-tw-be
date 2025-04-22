import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthRoleGuard } from '@shared/decorators/http.decorator';

import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    @AuthRoleGuard([])
    findUserById(@Param('id') id: string) {
        return this.userService.findUserById(id);
    }
}
