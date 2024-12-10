import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/roles/roles.guard';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { ROLES } from 'src/utils/constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/profile')
  @UseGuards(AuthGuard)
  async findOne(@Req() req: Request) {
    return this.usersService.findById(req.user.sub);
  }

  @Patch(':id/role')
  @Roles(ROLES.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async updateRole(@Param('id') id: string, @Body() data: { role: Role }) {
    return this.usersService.updateRole(id, data.role);
  }

  @Get()
  @Roles(ROLES.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  @Roles(ROLES.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
  
  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data);
  }
}
