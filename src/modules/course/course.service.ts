import { Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  @InjectRepository(Course)
  private readonly courseRepository: Repository<Course>;

  // Get all course
  async getAllCourses(): Promise<Course[]> {
    return await this.courseRepository.find();
  }
}
