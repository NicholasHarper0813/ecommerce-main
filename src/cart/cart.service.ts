import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CartService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(userId: string, createCartDto: CreateCartDto) {
    try {
      const cart = await this.dbService.cart.findFirst({
        where: {
          userId,
        },
      });
      if (!cart) {
        await this.dbService.cart.create({
          data: {
            User: {
              connect: {
                id: userId,
              },
            },
            cartItems: {
              create: {
                Product: {
                  connect: {
                    id: createCartDto.productId,
                  },
                },
                quantity: createCartDto.quantity,
              },
            },
          },
        });
      } else {
        const cartItem = await this.dbService.cartItem.findFirst({
          where: {
            cartId: cart.id,
            productId: createCartDto.productId,
          },
        });
        if (!cartItem) {
          await this.dbService.cartItem.create({
            data: {
              Cart: {
                connect: {
                  id: cart.id,
                },
              },
              Product: {
                connect: {
                  id: createCartDto.productId,
                },
              },
              quantity: createCartDto.quantity,
            },
          });
        } else {
          await this.dbService.cartItem.update({
            where: {
              id: cartItem.id,
            },
            data: {
              quantity: cartItem.quantity + createCartDto.quantity,
            },
          });
        }
      }

      return {
        data: null,
        message: 'Product added to cart successfully',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error?.meta?.cause || 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findCart(userId: string) {
    try {
      const cart = await this.dbService.cart.findFirst({
        where: {
          userId,
        },
        select: {
          id: true,
          cartItems: {
            select: {
              id: true,
              quantity: true,
              Product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  images: {
                    select: {
                      url: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return {
        data: cart,
        message: 'Cart fetched successfully',
      };
    } catch (error) {
      throw new HttpException(
        error?.meta?.cause || 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateQuantity(id: string, updateCartDto: UpdateCartDto) {
    try {
      await this.dbService.cartItem.update({
        where: {
          id,
        },
        data: {
          quantity: updateCartDto.quantity,
        },
      });
      return {
        data: null,
        message: 'Cart updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        error?.meta?.cause || 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeCartItem(id: string) {
    try {
      await this.dbService.cartItem.delete({
        where: {
          id,
        },
      });
      return {
        data: null,
        message: 'Cart item removed successfully',
      };
    } catch (error) {
      throw new HttpException(
        error?.meta?.cause || 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async destroyCart(id: string) {
    try {
      await this.dbService.cart.delete({
        where: {
          id,
        },
      });
      return {
        data: null,
        message: 'All cart items removed successfully',
      };
    } catch (error) {
      throw new HttpException(
        error?.meta?.cause || 'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
