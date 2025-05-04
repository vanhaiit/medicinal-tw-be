// Assuming this exists
import { WishlistRepository } from '@models/repositories/wishlist.repository';
import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '@shared/decorators/typeorm-ex.module';

import { WishlistController } from './wishlist.controller';
import { WishlistService } from './wishlist.service';

// Create this if needed

@Module({
    imports: [TypeOrmExModule.forCustomRepository([WishlistRepository])],
    controllers: [WishlistController],
    providers: [WishlistService],
})
export class WishlistModule {}
