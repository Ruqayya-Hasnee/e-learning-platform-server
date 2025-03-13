import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../User/user.service';
import { CreateUserDto } from '../User/dto/create-user.dto';
import { User } from '../User/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userService.findUserByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    return this.userService.createUser(createUserDto);
  }


  async login(loginDto: LoginDto): Promise<User> {
    const existingUser = await this.userService.findUserBy({
      email: loginDto.email,
      password: loginDto.password
    });

    if (!existingUser) {
      throw new UnauthorizedException();
    }

    return existingUser
  }
}
