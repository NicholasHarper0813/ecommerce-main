import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
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

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req: Request) {
    return this.wishlistService.findAll(req.user.sub);
  }
  
  @Post()
  @UseGuards(AuthGuard)
  create(@Req() req: Request, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(req.user.sub, createWishlistDto);
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
