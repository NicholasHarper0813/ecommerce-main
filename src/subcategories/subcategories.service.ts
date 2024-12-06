import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SubcategoriesService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(createSubcategoryDto: CreateSubcategoryDto) {
    try {
      const subCategory = await this.dbService.subCategory.create({
        data: createSubcategoryDto,
      });

      return {
        data: subCategory,
        message: 'Subcategory created successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error?.meta?.cause || 'Subcategory creation failed',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async findAll() {
    try {
      const subCategories = await this.dbService.subCategory.findMany();

      return {
        data: subCategories,
        message: 'Subcategories retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error?.meta?.cause || 'Subcategories retrieval failed',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async findOne(id: string) {
    try {
      const subCategory = await this.dbService.subCategory.findFirstOrThrow({
        where: { id },
      });

      return {
        data: subCategory,
        message: 'Subcategory retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error?.meta?.cause || 'Subcategory retrieval failed',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto) {
    try {
      const subCategory = await this.dbService.subCategory.update({
        where: { id },
        data: updateSubcategoryDto,
      });

      return {
        data: subCategory,
        message: 'Subcategory updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error?.meta?.cause || 'Subcategory update failed',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async remove(id: string) {
    try {
      const subCategory = await this.dbService.subCategory.delete({
        where: { id },
      });

      return {
        data: subCategory,
        message: 'Subcategory deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error?.meta?.cause || 'Subcategory deletion failed',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
