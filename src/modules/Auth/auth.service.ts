import { Injectable, ConflictException } from '@nestjs/common';
import { UserService } from '../User/user.service';
import { CreateUserDto } from '../User/dto/create-user.dto';
import { User } from '../User/entities/user.entity';

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
}
