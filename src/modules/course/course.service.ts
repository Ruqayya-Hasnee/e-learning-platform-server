import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/createCourse.dto';
import { User } from '../User/entities/user.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Get all courses
  async getAllCourses(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  // Create a new course
  async createCourse(createCourseDto: CreateCourseDto, userId: string): Promise<Course> {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newCourse = this.courseRepository.create({
      ...createCourseDto,
      created_by: user,
    });

    return this.courseRepository.save(newCourse);
  }
}
