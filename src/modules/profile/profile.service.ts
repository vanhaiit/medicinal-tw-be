import { ProfileEntity } from '@models/entities/profile.entity';
import { ProfileRepository } from '@models/repositories/profile.repository';
import { Injectable } from '@nestjs/common';

import mapDto from '@shared/helpers/mapdto';

import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Injectable()
export class ProfileService {
    constructor(private readonly profileRepository: ProfileRepository) {}

    async findAll(): Promise<ProfileEntity[]> {
        return this.profileRepository.find();
    }

    async findOne(id: number): Promise<ProfileEntity> {
        return this.profileRepository.findOneBy({ id });
    }

    async create(createProfileDto: CreateProfileDto): Promise<ProfileEntity> {
        const payload = mapDto(createProfileDto, CreateProfileDto);
        const profile = this.profileRepository.create(payload);
        return this.profileRepository.save(profile);
    }

    async update(updateProfileDto: UpdateProfileDto): Promise<ProfileEntity> {
        const payload = mapDto(updateProfileDto, CreateProfileDto);
        await this.profileRepository.update(payload.userId, updateProfileDto);
        return this.profileRepository.findOneBy({ id: payload.userId });
    }

    async remove(id: number): Promise<void> {
        await this.profileRepository.delete(id);
    }
}
