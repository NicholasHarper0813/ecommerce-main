import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.dbService.category.create({
      data: createCategoryDto,
    });
    return {
      data: newCategory,
      message: 'Category created successfully',
    };
  }

  async findAll() {
    const categories = await this.dbService.category.findMany({
      include: { subCategories: true },
    });
    return {
      data: categories,
      message: 'Categories retrieved successfully',
    };
  }

  async findOne(id: string) {
    const category = await this.dbService.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Category with id ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      data: category,
      message: 'Category retrieved successfully',
    };
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.dbService.category.update({
        where: { id },
        data: updateCategoryDto,
      });
      return {
        data: updatedCategory,
        error: false,
        message: 'Category updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error?.meta?.cause || 'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      await this.dbService.category.delete({
        where: { id },
      });
      return {
        data: null,
        error: false,
        message: 'Category deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error?.meta?.cause || 'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
