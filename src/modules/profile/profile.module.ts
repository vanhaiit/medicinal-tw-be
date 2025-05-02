import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';
import { ProfileRepository } from '@models/repositories/profile.repository';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([ProfileRepository]),
    ],
    controllers: [ProfileController],
    providers: [ProfileService],
})
export class ProfileModule {} 