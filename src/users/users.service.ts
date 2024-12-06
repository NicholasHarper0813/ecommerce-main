import { HttpException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DatabaseService) {}

  async findOne(email: string) {
    try {
      const user = await this.dbService.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw 'User not found';
      }
      return user;
    } catch (error) {
      throw new HttpException(error?.meta?.cause || 'User not found', 404);
    }
  }

  async findAll() {
    try {
      const users = await this.dbService.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          address: true,
        },
      });
      return {
        data: users,
        message: 'Users found',
      };
    } catch (error) {
      throw new HttpException(error?.meta?.cause || 'Users not found', 404);
    }
  }

  async findById(id: string) {
    try {
      const user = await this.dbService.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        throw 'User not found';
      }
      delete user.password;
      return {
        data: user,
        message: 'User found',
      };
    } catch (error) {
      throw new HttpException(error?.meta?.cause || 'User not found', 404);
    }
  }

  async register(data: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(
        data.password,
        +process.env.SALT_ROUNDS,
      );

      const newUser = await this.dbService.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          role: data.role,
          address: data.address,
        },
      });

      return newUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(error?.meta?.cause || 'User not created', 500);
    }
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      const user = await this.dbService.user.update({
        where: {
          id,
        },
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });

      delete user.password;
      return {
        data: user,
        message: 'User updated successfully',
      };
    } catch (error) {
      throw new HttpException(error?.meta?.cause || 'User not updated', 500);
    }
  }

  async updateRole(id: string, role: Role) {
    try {
      const user = await this.dbService.user.update({
        where: {
          id,
        },
        data: {
          role,
        },
      });

      delete user.password;
      return {
        data: user,
        message: 'User role updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        error?.meta?.cause || 'User role not updated',
        500,
      );
    }
  }

  async delete(id: string) {
    try {
      const user = await this.dbService.user.delete({
        where: {
          id,
        },
      });

      return {
        data: user,
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new HttpException(error?.meta?.cause || 'User not deleted', 500);
    }
  }
}
