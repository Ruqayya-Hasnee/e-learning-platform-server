import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthenticatedRequest } from 'src/types/common';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/createCourse.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAllCourses(): Promise<Course[]> {
    return this.courseService.getAllCourses();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './uploads/courses',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 100 * 1024 * 1024 },
    }),
  )
  async createCourse(
    @Body() courseData: CreateCourseDto,
    @UploadedFile() video: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    if (!video) {
      throw new Error('No video file uploaded');
    }

    const videoPath = `/uploads/courses/${video.filename}`;
    return this.courseService.createCourse(courseData, videoPath, userId);
  }

  @Get('uploadedByMe')
  async getAllCoursesuploadedByMe(
    @Req() req: AuthenticatedRequest,
  ): Promise<Course[]> {
    const userId = req.user?.userId;
    return this.courseService.getAllCoursesuploadedByMe(userId);
  }

  // Enroll a user in a course
  @Post('enroll')
  async enrollUser(
    @Body('userId') userId: string,
    @Body('courseId') courseId: string,
  ) {
    return this.courseService.enrollUser(userId, courseId);
  }
}
