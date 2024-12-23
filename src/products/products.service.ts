import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DatabaseService } from 'src/database/database.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductsService 
{
  constructor(
    private readonly dbService: DatabaseService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    images: Express.Multer.File[],
  ) {
    try 
    {
      if (images.length === 0) 
      {
        throw new HttpException(
          'At least one image is required',
          HttpStatus.BAD_REQUEST,
        );
      }
      this.validateImages(images);

      const imageUrls = await Promise.all(
        images.map(async (image) => {
          return await this.cloudinary.uploadImage(image);
        }),
      );

      const product = await this.dbService.product.create({
        data: 
        {
          name: createProductDto.name,
          description: createProductDto.description,
          price: +createProductDto.price,
          stock: 10,
          images: 
          {
            create: imageUrls.map(({ url }) => ({
              url: url,
            })),
          },
          SubCategory: 
          {
            connect: 
            {
              id: createProductDto.subCategoryId,
            },
          },
        },
      });

      return 
      {
        data: product,
        message: 'Product created successfully',
      };
    } 
    catch (error) 
    {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error.message,
      });
    }
  }

  async findAll() 
  {
    try 
    {
      const products = await this.dbService.product.findMany({
        include: 
        {
          images: true,
        },
      });
      return 
      {
        data: products,
        message: 'Products fetched successfully',
      };
    } 
    catch (error) 
    {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error.message,
      });
    }
  }

  async findOne(id: string)
  {
    try 
    {
      const product = await this.dbService.product.findUnique({
        where: 
        {
          id: id,
        },
        include: 
        {
          images: true,
        },
      });
      return 
      {
        data: product,
        message: 'Product fetched successfully',
      };
    } 
    catch (error) 
    {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error.message,
      });
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    images: Express.Multer.File[],
  ) 
  {
    try 
    {
      this.validateImages(images);

      const imageUrls = await Promise.all(
        images.map(async (image) => {
          return await this.cloudinary.uploadImage(image);
        }),
      );

      const product = await this.dbService.product.update({
        where: 
        {
          id: id,
        },
        data: 
        {
          name: updateProductDto.name,
          description: updateProductDto.description,
          price: +updateProductDto.price,
          images: 
          {
            create: imageUrls.map(({ url }) => ({
              url: url,
            })),
          },
        },
      });

      return 
      {
        data: product,
        message: 'Product updated successfully',
      };
    } 
    catch (error) 
    {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error.message,
      });
    }
  }

  async remove(id: string) 
  {
    try 
    {
      const product = await this.dbService.product.delete({
        where: 
        {
          id: id,
        },
      });
      return 
      {
        data: product,
        message: 'Product deleted successfully',
      };
    } 
    catch (error) 
    {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error.message,
      });
    }
  }

  private async validateImages(images: Express.Multer.File[]) 
  {
    images.forEach((image) => {
      if (!image.mimetype.includes('image')) 
      {
        throw new HttpException(
          'Only images are allowed',
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }
}
