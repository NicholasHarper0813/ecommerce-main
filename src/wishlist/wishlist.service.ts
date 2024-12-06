import { HttpException, Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WishlistService {
  constructor(private readonly dbService: DatabaseService) {}
  async create(userId: string, createWishlistDto: CreateWishlistDto) {
    try {
      const wishlist = await this.dbService.wishlist.findFirst({
        where: {
          userId: userId,
        },
      });

      if (wishlist) {
        await this.dbService.wishlist.update({
          where: {
            id: wishlist.id,
          },
          data: {
            items: {
              create: {
                Product: {
                  connect: {
                    id: createWishlistDto.productId,
                  },
                },
              },
            },
          },
        });
      } else {
        await this.dbService.wishlist.create({
          data: {
            User: {
              connect: {
                id: userId,
              },
            },
            items: {
              create: {
                Product: {
                  connect: {
                    id: createWishlistDto.productId,
                  },
                },
              },
            },
          },
        });
      }
      return {
        data: null,
        message: 'Product has been added to wishlist successfully',
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findAll(userId: string) {
    try {
      const wishlist = await this.dbService.wishlist.findFirst({
        where: {
          userId: userId,
        },
        select: {
          id: true,
          items: {
            select: {
              id: true,
              Product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      });

      return {
        data: wishlist,
        message: 'Wishlist has been retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async remove(wishListItemId: string) {
    try {
      await this.dbService.wishlistItem.delete({
        where: {
          id: wishListItemId,
        },
      });

      return {
        data: null,
        message: 'Product has been removed from wishlist successfully',
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async removeAll(userId: string) {
    try {
      await this.dbService.wishlist.deleteMany({
        where: {
          userId: userId,
        },
      });
      return {
        data: null,
        message: 'Wishlist has been cleared successfully',
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
