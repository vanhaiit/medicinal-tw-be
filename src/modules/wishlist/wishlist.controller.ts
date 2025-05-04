import { UserEntity } from '@models/entities/user.entity';
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

// Assuming this exists based on post module
// Adjust if needed
import {
    CreateWishlistRequestDto,
    DeleteWishlistRequestDto,
    GetWishlistRequestDto,
    UpdateWishlistRequestDto,
} from './dto/wishlist.req.dto';
import { WishlistService } from './wishlist.service';

@ApiTags('Wishlist')
@Controller('wishlist')
export class WishlistController {
    constructor(private readonly wishlistService: WishlistService) {}

    @Get()
    @AuthRoleGuard([]) // Assuming wishlists might be public; adjust guards as needed
    getAll(
        @AuthUser() user: UserEntity,
        @Query() query: GetWishlistRequestDto,
    ) {
        return this.wishlistService.getAllWishlist(user.id, query);
    }

    @Get(':id')
    @AuthRoleGuard([])
    getDetail(@Param('id') id: number) {
        return this.wishlistService.getWishlistDetail(id);
    }

    @Post()
    @AuthRoleGuard([]) // Requires authentication; adjust roles
    createWishlist(
        @AuthUser() user: UserEntity,
        @Body() body: CreateWishlistRequestDto,
    ) {
        return this.wishlistService.createWishlist(user.id, body);
    }

    @Put(':id')
    @AuthRoleGuard([])
    updateWishlist(
        @Param('id') id: number,
        @Body() body: UpdateWishlistRequestDto,
    ) {
        return this.wishlistService.updateWishlist(id, body);
    }

    @Delete()
    @AuthRoleGuard([])
    deleteWishlist(@Query() query: DeleteWishlistRequestDto) {
        return this.wishlistService.deleteWishlist(query);
    }
}
