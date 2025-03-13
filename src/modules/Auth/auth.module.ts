import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../User/user.module';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers:[AuthService]
})
export class AuthModule {}
