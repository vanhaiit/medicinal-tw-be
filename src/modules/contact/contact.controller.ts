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
import { PublicRoute } from '@shared/decorators/public-route.decorator';
import mapDto from '@shared/helpers/mapdto';

import { ContactEntity } from '../../models/entities/contact.entity';
import { UserEntity } from '../../models/entities/user.entity';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { GetContactRequestDto } from './dto/get-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    @Get()
    @PublicRoute()
    async findAll(@Query() query: GetContactRequestDto) {
        return this.contactService.getAll(query);
    }

    @Get(':id')
    @AuthRoleGuard([])
    async findOne(
        @AuthUser() user: UserEntity,
        @Param('id') id: number,
    ): Promise<ContactEntity> {
        return this.contactService.findOne(user.id, id);
    }

    @Post()
    @PublicRoute()
    async create(@Body() data: CreateContactDto): Promise<ContactEntity> {
        const payload = mapDto(data, CreateContactDto);
        return this.contactService.create(payload);
    }

    @Put(':id')
    @AuthRoleGuard([])
    async update(
        @AuthUser() user: UserEntity,
        @Param('id') id: number,
        @Body() data: UpdateContactDto,
    ): Promise<ContactEntity> {
        return this.contactService.update(user.id, id, data);
    }

    @Delete(':id')
    @AuthRoleGuard([])
    async remove(
        @AuthUser() user: UserEntity,
        @Param('id') id: number,
    ): Promise<void> {
        return this.contactService.remove(user.id, id);
    }
}
