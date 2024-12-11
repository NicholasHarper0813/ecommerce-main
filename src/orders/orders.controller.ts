import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Req,
  Patch,
  Body,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() req: Request) {
    const user = req.user;
    return this.ordersService.findAll(user.sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Req() req: Request, @Param('id') id: string) {
    const user = req.user;
    return this.ordersService.findOne(user.sub, id);
  }
    
  @Post()
  @UseGuards(AuthGuard)
  create(@Req() req: Request) {
    const user = req.user;
    return this.ordersService.create(user.sub);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) 
  {
    const user = req.user;
    return this.ordersService.update(user.sub, id, updateOrderDto);
  }
}
