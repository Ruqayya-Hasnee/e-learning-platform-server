import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../User/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule,
    JwtModule.register({
      secret: 'adada', // Replace with a strong secret
      signOptions: { expiresIn: '1h' }, // Token expiry time
    }),
  ],
  controllers: [AuthController],
  providers:[AuthService]
})
export class AuthModule {}
