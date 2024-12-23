import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/roles/roles.decorator';
import { ROLES } from 'src/utils/constants';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';

@Controller('products')
export class ProductsController 
{
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(ROLES.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('images'))
  create(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto,
  ) 
  {
    return this.productsService.create(createProductDto, images);
  }

  @Get()
  findAll() 
  {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) 
  {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Roles(ROLES.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('images'))
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) 
  {
    return this.productsService.update(id, updateProductDto, images);
  }

  @Delete(':id')
  @Roles(ROLES.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) 
  {
    return this.productsService.remove(id);
  }
}
