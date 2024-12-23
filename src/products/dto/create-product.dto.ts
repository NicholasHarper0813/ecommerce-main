import { IsDecimal, IsString } from 'class-validator';

export class CreateProductDto 
{
  @IsString()
  name: string;
  @IsString()
  description: string;

  @IsDecimal()
  price: number;

  @IsString()
  subCategoryId: string;
}
