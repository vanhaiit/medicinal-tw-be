import { PostRepository } from '@models/repositories/post.responsitory';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([PostRepository])],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule {}
