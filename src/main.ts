import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/App/app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtMiddleware } from './middlewares/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // 👈 Enables CORS
  app.useGlobalPipes(new ValidationPipe());  
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
