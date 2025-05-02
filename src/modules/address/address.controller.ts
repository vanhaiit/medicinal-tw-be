import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthUser } from '@shared/decorators/auth-user.decorator';
import { AuthRoleGuard } from '@shared/decorators/http.decorator';

import { AddressEntity } from '../../models/entities/address.entity';
import { UserEntity } from '../../models/entities/user.entity';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@ApiTags('Addresses')
@Controller('addresses')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get()
    @AuthRoleGuard([])
    async findAll(@AuthUser() user: UserEntity): Promise<AddressEntity[]> {
        return this.addressService.findAll(user.id);
    }

    @Get(':id')
    @AuthRoleGuard([])
    async findOne(
        @AuthUser() user: UserEntity,
        @Param('id') id: number,
    ): Promise<AddressEntity> {
        return this.addressService.findOne(user.id, id);
    }

    @Post()
    @AuthRoleGuard([])
    async create(
        @AuthUser() user: UserEntity,
        @Body() data: CreateAddressDto,
    ): Promise<AddressEntity> {
        return this.addressService.create(user.id, data);
    }

    @Put(':id')
    @AuthRoleGuard([])
    async update(
        @AuthUser() user: UserEntity,
        @Param('id') id: number,
        @Body() data: UpdateAddressDto,
    ): Promise<AddressEntity> {
        return this.addressService.update(user.id, id, data);
    }

    @Delete(':id')
    @AuthRoleGuard([])
    async remove(
        @AuthUser() user: UserEntity,
        @Param('id') id: number,
    ): Promise<void> {
        return this.addressService.remove(user.id, id);
    }
}
