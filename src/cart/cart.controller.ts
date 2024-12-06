import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Req() req: Request, @Body() createCartDto: CreateCartDto) {
    return this.cartService.create(req.user.sub, createCartDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.cartService.findCart(req.user.sub);
  }

  @Patch('update-quantity/:id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateQuantity(id, updateCartDto);
  }

  @Delete('remove-item/:id')
  remove(@Param('id') id: string) {
    return this.cartService.removeCartItem(id);
  }

  @Delete('clear-cart/:id')
  clearCart(@Param('id') id: string) {
    return this.cartService.destroyCart(id);
  }
}
