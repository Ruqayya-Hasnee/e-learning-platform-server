import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/App/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        // Allow requests from Postman or server-to-server requests
        return callback(null, true);
      }
      callback(null, true); // Allow all origins dynamically
    },
    credentials: true, // ✅ Allow cookies and authentication headers
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  

  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.PORT ?? 5000);
}

bootstrap();
