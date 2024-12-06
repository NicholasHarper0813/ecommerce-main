import { Role } from '@prisma/client';
import { IsIn, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsIn([Role.ADMIN, Role.USER])
  role: Role;

  @IsString()
  address: string;
}
