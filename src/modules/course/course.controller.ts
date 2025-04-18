import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Headers,
  Req,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/createCourse.dto';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from '../Auth/auth.service';

@Controller('courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly authService: AuthService,
  ) {}

  // Get all courses
  @Get()
  async getAllCourses(): Promise<Course[]> {
    return this.courseService.getAllCourses();
  }

  // Create a new course with video upload
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
      limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
    }),
  )
  async createCourse(
    @Body() courseData: CreateCourseDto,
    @UploadedFile() video: Express.Multer.File,
    @Headers('authorization') authHeader: string,
  ) {
    // Check if authorization header exists
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    // Decode token and get user ID
    const token = this.extractToken(authHeader);
    const decodedToken = this.authService.verifyToken(token);
    const userId = decodedToken.userId;

    // Ensure video is uploaded
    if (!video) {
      throw new InternalServerErrorException('No video file uploaded');
    }

    // Save course and video path
    const videoPath = `/uploads/courses/${video.filename}`;
    return this.courseService.createCourse(courseData, videoPath, userId);
  }

  // Get courses uploaded by the current instructor
  @Get('uploadedByMe')
  async getAllCoursesuploadedByMe(
    @Headers('authorization') authHeader: string,
  ) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = this.extractToken(authHeader);
    const decodedToken = this.authService.verifyToken(token);
    const userId = decodedToken.userId;

    return this.courseService.getAllCoursesuploadedByMe(userId);
  }

  // Enroll a student in a course
  @Post('enroll')
  async enrollUser(
    @Body('courseId') courseId: string,
    @Headers('authorization') authHeader: string,
  ) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = this.extractToken(authHeader);
    const decodedToken = this.authService.verifyToken(token);
    const userId = decodedToken.userId;

    return this.courseService.enrollUser(userId, courseId);
  }

  // Extract token from Authorization header
  private extractToken(authHeader: string): string {
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing or malformed');
    }
    return token;
  }

  // Get courses enrolled by the current student
  @Get('enrolledByMe')
  async getCoursesEnrolledByMe(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = this.extractToken(authHeader);
    const decodedToken = this.authService.verifyToken(token);
    const userId = decodedToken.userId;

    return this.courseService.getCoursesEnrolledByMe(userId);
  }
}
