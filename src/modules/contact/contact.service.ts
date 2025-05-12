import { ContactRepository } from '@models/repositories/contact.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ContactEntity } from '../../models/entities/contact.entity';
import { GetContactRequestDto } from './dto/get-contact.dto';

@Injectable()
export class ContactService {
    constructor(private readonly contactRepository: ContactRepository) {}

    async getAll(query: GetContactRequestDto) {
        return this.contactRepository.getAll(query);
    }

    async findAll(userId: number): Promise<ContactEntity[]> {
        return this.contactRepository.find({ where: { userId } });
    }

    async findOne(id: number): Promise<ContactEntity> {
        const contact = await this.contactRepository.findOneBy({ id });
        if (!contact) {
            throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
        }
        return contact;
    }

    async create(data: Partial<ContactEntity>): Promise<ContactEntity> {
        try {
            const contact = this.contactRepository.create(data);
            return await this.contactRepository.save(contact);
        } catch (error) {
            throw new HttpException(
                'Create contact failed',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async update(
        id: number,
        data: Partial<ContactEntity>,
    ): Promise<ContactEntity> {
        const contact = await this.contactRepository.findOneBy({ id });
        if (!contact) {
            throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
        }
        try {
            await this.contactRepository.update({ id }, data);
            return this.findOne(id);
        } catch (error) {
            throw new HttpException(
                'Update contact failed',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async remove(userId: number, id: number): Promise<void> {
        const contact = await this.contactRepository.findOneBy({ id, userId });
        if (!contact) {
            throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
        }
        try {
            await this.contactRepository.softDelete({ id, userId });
        } catch (error) {
            throw new HttpException(
                'Delete contact failed',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
