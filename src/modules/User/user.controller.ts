import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthenticatedRequest } from 'src/types/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  getProfile(@Req() req: AuthenticatedRequest) {
    return this.userService.findUserById(req.user.id); // Use user ID from token
  }
}
