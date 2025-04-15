import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { AuthService } from 'src/modules/Auth/auth.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log(req.originalUrl);

    const publicPaths = [
      '/auth/',
      '/uploads/courses',
      '/courses',
    ];

    // Check if request URL starts with any public path
    if (publicPaths.some(path => req.originalUrl.startsWith(path))) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.replace('Bearer ', '');
    try {
      const decoded = this.authService.verifyToken(token); // Use AuthService method
      (req as any).user = decoded; // Attach user data to request
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
