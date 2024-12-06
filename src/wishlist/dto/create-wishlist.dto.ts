import { IsString } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  productId: string;
}
