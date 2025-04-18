import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { User } from '../User/entities/user.entity';
import { CreateCourseDto } from './dto/createCourse.dto';
import { EnrollCourse } from './entities/coursesEnrollment.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(EnrollCourse)
    private readonly enrollCourseRepository: Repository<EnrollCourse>,
  ) {}

  // Get all courses
  async getAllCourses(): Promise<Course[]> {
    return await this.courseRepository.find({ relations: ['created_by'] });
  }

  // Get all courses uploaded by a specific user
  async getAllCoursesuploadedByMe(userId: string): Promise<Course[]> {
    return await this.courseRepository.find({
      where: { created_by: { id: userId } },
      relations: ['created_by'],
    });
  }

  // Create a new course
  async createCourse(
    courseData: CreateCourseDto,
    videoPath: string,
    userId: string,
  ): Promise<Course> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const newCourse = this.courseRepository.create({
      ...courseData,
      videoPath,
    });
    newCourse.created_by = user;

    return await this.courseRepository.save(newCourse);
  }

  // Enroll a user in a course
  async enrollUser(userId: string, courseId: string): Promise<EnrollCourse> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');

      const course = await this.courseRepository.findOne({
        where: { id: courseId },
      });
      if (!course) throw new NotFoundException('Course not found');

      const existingEnrollment = await this.enrollCourseRepository.findOne({
        where: { user: { id: userId }, course: { id: courseId } },
      });

      if (existingEnrollment)
        throw new ConflictException('User is already enrolled');

      const enrollment = this.enrollCourseRepository.create({ user, course });
      return await this.enrollCourseRepository.save(enrollment);
    } catch (error) {
      console.error('Enrollment Error:', error);
      throw error;
    }
  }

  // Retrieves a list of courses enrolled by a specific user
  async getCoursesEnrolledByMe(userId: string): Promise<Course[]> {
    const enrollments = await this.enrollCourseRepository.find({
      where: { user: { id: userId } },
      relations: ['course'],
    });
  
    if (!enrollments.length) {
      return [];
    }
  
    return enrollments.map((enrollment) => enrollment.course);
  }
  
}
