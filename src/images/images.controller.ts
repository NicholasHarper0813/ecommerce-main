import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ROLES } from 'src/utils/constants';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('images')
export class ImagesController 
{
  constructor(private readonly imagesService: ImagesService) {}

  @Delete(':id')
  @Roles(ROLES.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) 
  {
    return this.imagesService.remove(id);
  }
}
