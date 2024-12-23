import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { ROLES } from 'src/utils/constants';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('categories')
export class CategoriesController 
{
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Roles(ROLES.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) 
  {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() 
  {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) 
  {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @Roles(ROLES.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) 
  {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles(ROLES.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) 
  {
    return this.categoriesService.remove(id);
  }
}
