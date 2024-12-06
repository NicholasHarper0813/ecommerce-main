import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ImagesService {
  constructor(private readonly dbService: DatabaseService) {}

  async remove(id: string) {
    try {
      await this.dbService.image.delete({
        where: {
          id,
        },
      });

      return {
        data: null,
        message: 'Image has been deleted',
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
