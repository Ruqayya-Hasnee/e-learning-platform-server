import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../User/user.service';
import { CreateUserDto } from '../User/dto/create-user.dto';
import { User } from '../User/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userService.findUserByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    return this.userService.createUser(createUserDto);
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const existingUser = await this.userService.findUserBy({
      email: loginDto.email,
      password: loginDto.password,
    });

    if (!existingUser) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT token
    const payload = { userId: existingUser.id, email: existingUser.email };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
