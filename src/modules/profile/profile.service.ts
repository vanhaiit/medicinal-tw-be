import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileRepository } from '@models/repositories/profile.repository';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { ProfileEntity } from '@models/entities/profile.entity';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Injectable()
export class ProfileService {
    constructor(
        private readonly profileRepository: ProfileRepository,
    ) {}

    async findAll(): Promise<ProfileEntity[]> {
        return this.profileRepository.find();
    }

    async findOne(id: number): Promise<ProfileEntity> {
        return this.profileRepository.findOneBy({ id });
    }

    async create(createProfileDto: CreateProfileDto, userId: number): Promise<ProfileEntity> {
        const profile = this.profileRepository.create({...createProfileDto, userId});
        return this.profileRepository.save(profile);
    }

    async update(id: number, updateProfileDto: UpdateProfileDto): Promise<ProfileEntity> {
        await this.profileRepository.update(id, updateProfileDto);
        return this.profileRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.profileRepository.delete(id);
    }
} 