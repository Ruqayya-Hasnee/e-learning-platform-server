import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity'; 
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { User } from '../User/entities/user.entity';
import { CoursesEnrollment } from './entities/coursesEnrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CoursesEnrollment, User])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
