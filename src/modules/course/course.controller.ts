import { Controller, Get, Req } from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthenticatedRequest } from 'src/types/common';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}
  

    @Get('/getAllCourses')
async getAllCourses(): Promise<Course[]> {
  return this.courseService.getAllCourses();
}

    }