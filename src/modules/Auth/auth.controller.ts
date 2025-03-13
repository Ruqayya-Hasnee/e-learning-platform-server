import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('/login')
  handleLogin(@Body() loginBody: LoginDto) {
    return loginBody;
  }

  @Post('/signup')
  handleSignup(@Body() signupBody: SignupDto) {
    return signupBody;
  }
}
