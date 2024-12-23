import { IsInt, IsString } from 'class-validator';

export class CreateCartDto 
{
  @IsString()
  productId: string;

  @IsInt()
  quantity: number;
}
