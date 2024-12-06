import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Req() req: Request, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(req.user.sub, createWishlistDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req: Request) {
    return this.wishlistService.findAll(req.user.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.wishlistService.remove(id);
  }

  @Delete('destroy-all')
  @UseGuards(AuthGuard)
  removeAll(@Req() req: Request) {
    return this.wishlistService.removeAll(req.user.sub);
  }
}
