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

import { AuthRoleGuard } from '@shared/decorators/http.decorator';
import { PublicRoute } from '@shared/decorators/public-route.decorator';
import { AuthUser } from '@shared/decorators/auth-user.decorator';
import { UserEntity } from '@models/entities/user.entity';

import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@Controller('profiles')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get()
    @AuthRoleGuard([])
    findOne( @AuthUser() user: UserEntity,) {
        return this.profileService.findOne(user.id);
    }

    @Post()
    @AuthRoleGuard([])
    create(@Body() createProfileDto: CreateProfileDto, @AuthUser() user: UserEntity) {
        return this.profileService.create(createProfileDto, user.id );
    }

    @Put()
    @AuthRoleGuard([])
    update(@AuthUser() user: UserEntity, @Body() updateProfileDto: UpdateProfileDto) {
        return this.profileService.update(user.id, updateProfileDto);
    }

} 