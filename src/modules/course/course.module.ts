import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity'; 
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { User } from '../User/entities/user.entity';
import { EnrollCourse } from './entities/coursesEnrollment.entity';
import { AuthModule } from '../Auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, EnrollCourse, User]),
    AuthModule, 
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
