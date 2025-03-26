import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthenticatedRequest } from 'src/types/common';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/createCourse.dto';



@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAllCourses(): Promise<Course[]> {
    return this.courseService.getAllCourses();
  }

  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto, @Req() req: AuthenticatedRequest) {
    return this.courseService.createCourse(createCourseDto, req.user?.userId);
  }
}
