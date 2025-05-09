import { Module } from '@nestjs/common';
import { UserRepository } from 'models/repositories/user.repository';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
