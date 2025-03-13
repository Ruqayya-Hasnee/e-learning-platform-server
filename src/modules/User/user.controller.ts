import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() body: { email: string; password: string }) {
    return this.userService.createUser(body.email, body.password);
  }

  @Get(':email')
  async findUser(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
