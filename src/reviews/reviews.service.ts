import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly dbService: DatabaseService) {}

  async create(userId: string, createReviewDto: CreateReviewDto) {
    try {
      const review = await this.dbService.review.create({
        data: {
          User: {
            connect: {
              id: userId,
            },
          },
          Product: {
            connect: {
              id: createReviewDto.productId,
            },
          },
          review: createReviewDto.review,
          rating: createReviewDto.rating,
        },
      });

      return {
        data: review,
        message: 'Review created successfully',
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findAll() {
    try {
      const reviews = await this.dbService.review.findMany();

      if (!reviews.length) {
        throw 'No reviews found';
      }

      return {
        data: reviews,
        message: 'Reviews retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findOne(id: string) {
    try {
      const review = await this.dbService.review.findFirstOrThrow({
        where: {
          id,
        },
      });

      return {
        data: review,
        message: 'Review retrieved successfully',
      };
    } catch (error) {
      if (error?.code === 'P2025') {
        throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    try {
      const review = await this.dbService.review.update({
        where: {
          id,
        },
        data: {
          review: updateReviewDto.review,
          rating: updateReviewDto.rating,
        },
      });

      return {
        data: review,
        message: 'Review updated successfully',
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async remove(id: string) {
    try {
      await this.dbService.review.delete({
        where: {
          id,
        },
      });

      return {
        message: 'Review deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        error?.meta?.cause || 'Something went wrong',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
