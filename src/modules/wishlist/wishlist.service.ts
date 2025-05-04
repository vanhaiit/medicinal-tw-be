import { WishlistRepository } from '@models/repositories/wishlist.repository';
// Assuming this exists or needs creation
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// Adjust based on your constants
import mapDto from '@shared/helpers/mapdto';

// Assuming this helper exists
import {
    CreateWishlistRequestDto,
    DeleteWishlistRequestDto,
    GetWishlistRequestDto,
    UpdateWishlistRequestDto,
} from './dto/wishlist.req.dto';

@Injectable()
export class WishlistService {
    constructor(private readonly wishlistRepository: WishlistRepository) {}

    async getAllWishlist(userId: number, query: GetWishlistRequestDto) {
        const [result, metadata]: any = await this.wishlistRepository.getAll(
            userId,
            query,
        );
        if (!result) {
            throw new HttpException('No wishlists found', HttpStatus.NOT_FOUND);
        }
        return result.toPageDto(metadata);
    }

    async getWishlistDetail(id: number) {
        const wishlist = await this.wishlistRepository.findOne({
            where: { id },
        });
        if (!wishlist) {
            throw new HttpException('Wishlist not found', HttpStatus.NOT_FOUND);
        }
        return wishlist;
    }

    async createWishlist(userId: number, body: CreateWishlistRequestDto) {
        const payload = mapDto(body, CreateWishlistRequestDto);
        return await this.wishlistRepository.save(
            this.wishlistRepository.create({ ...payload, userId }),
        );
    }

    async updateWishlist(id: number, body: UpdateWishlistRequestDto) {
        const wishlist = await this.wishlistRepository.findOne({
            where: { id },
        });
        if (!wishlist) {
            throw new HttpException('Wishlist not found', HttpStatus.NOT_FOUND);
        }
        const payload = mapDto(body, UpdateWishlistRequestDto);
        return await this.wishlistRepository.save({ ...wishlist, ...payload });
    }

    async deleteWishlist(query: DeleteWishlistRequestDto) {
        return await this.wishlistRepository.delete(query.ids);
    }
}
