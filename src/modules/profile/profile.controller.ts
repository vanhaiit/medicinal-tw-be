import { UserEntity } from '@models/entities/user.entity';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthUser } from '@shared/decorators/auth-user.decorator';
import { AuthRoleGuard } from '@shared/decorators/http.decorator';

import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@Controller('profiles')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get(':id')
    @AuthRoleGuard([])
    findOne(@Param('id') id: number, @AuthUser() user: UserEntity) {
        return this.profileService.findOne(id || user.id);
    }

    @Post()
    @AuthRoleGuard([])
    create(
        @Body() createProfileDto: CreateProfileDto,
        @AuthUser() user: UserEntity,
    ) {
        return this.profileService.create(createProfileDto, user.id);
    }

    @Put()
    @AuthRoleGuard([])
    update(
        @AuthUser() user: UserEntity,
        @Body() updateProfileDto: UpdateProfileDto,
    ) {
        return this.profileService.update(user.id, updateProfileDto);
    }
}
