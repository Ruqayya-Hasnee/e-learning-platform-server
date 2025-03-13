import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async handleLogin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);

  }

  @Post('/signup')
  async handleSignup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
