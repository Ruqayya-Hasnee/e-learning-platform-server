import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { User } from '../User/entities/user.entity';
import { CreateCourseDto } from './dto/createCourse.dto';
import { CoursesEnrollment } from './entities/coursesEnrollment.entity';

@Injectable()
export class CourseService {
  getAllCoursesuploadedByMe: any;
  getAllCourses: any;
  createCourse(courseData: CreateCourseDto, videoPath: string, userId: any) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(CoursesEnrollment)
    private readonly enrollCourseRepository: Repository<CoursesEnrollment>, 
  ) {}

  // Enroll a user in a course
  async enrollUser(userId: string, courseId: string): Promise<CoursesEnrollment> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');

    const existingEnrollment = await this.enrollCourseRepository.findOne({
      where: { user: { id: userId }, course: { id: courseId } },
    });

    if (existingEnrollment) throw new ConflictException('User is already enrolled in this course');

    const enrollment = this.enrollCourseRepository.create({ user, course });
    return await this.enrollCourseRepository.save(enrollment);
  }
}
