import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async register(data: CreateUserDto) {
    const user = await this.userService.register(data);
    delete user.password;
    return {
      user,
      token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
        role: user.role,
      }),
      message: 'User registered successfully',
    };
  }
  
  async signIn(loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto.email);
    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid credentials', 401);
    }

    delete user.password;  // for safety. version 0.1/ nicholas

    return {
      user,
      token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
        role: user.role,
      }),
      message: 'User logged in successfully',
    };
  }
}
