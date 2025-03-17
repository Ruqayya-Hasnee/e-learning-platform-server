import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../Auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JwtMiddleware } from 'src/middlewares/auth.middleware';
import { AuthService } from '../Auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly authService: AuthService) {} // Inject AuthService

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*'); // Apply globally
  }
}
