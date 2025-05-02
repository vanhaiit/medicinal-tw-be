import { AddressRepository } from '@models/repositories/address.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AddressEntity } from '../../models/entities/address.entity';

@Injectable()
export class AddressService {
    constructor(private readonly addressRepository: AddressRepository) {}

    async findAll(userId: number): Promise<AddressEntity[]> {
        return this.addressRepository.find({ where: { userId } });
    }

    async findOne(userId: number, id: number): Promise<AddressEntity> {
        const address = await this.addressRepository.findOneBy({ id, userId });
        if (!address) {
            throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
        }
        return address;
    }

    async create(
        userId: number,
        data: Partial<AddressEntity>,
    ): Promise<AddressEntity> {
        try {
            const address = this.addressRepository.create({ ...data, userId });
            return await this.addressRepository.save(address);
        } catch (error) {
            throw new HttpException(
                'Create address failed',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async update(
        userId: number,
        id: number,
        data: Partial<AddressEntity>,
    ): Promise<AddressEntity> {
        const address = await this.addressRepository.findOneBy({ id, userId });
        if (!address) {
            throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
        }
        try {
            await this.addressRepository.update({ id, userId }, data);
            return this.findOne(userId, id);
        } catch (error) {
            throw new HttpException(
                'Update address failed',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async remove(userId: number, id: number): Promise<void> {
        const address = await this.addressRepository.findOneBy({ id, userId });
        if (!address) {
            throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
        }
        try {
            await this.addressRepository.softDelete({ id, userId });
        } catch (error) {
            throw new HttpException(
                'Delete address failed',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
