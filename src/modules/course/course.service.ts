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
    return this.courseRepository.find({
      relations: ['created_by'], 
    });
  }

  // Create a new course
 
  async createCourse(courseData: CreateCourseDto, videoPath: string, createdBy: string) {
    console.log("Saving Video Path:", videoPath); // ✅ Debugging log
  
    const newCourse = this.courseRepository.create({
      ...courseData,
      videoPath, // ✅ Ensure videoPath is included
      created_by: { id: createdBy }, // ✅ Pass created_by correctly
    });
  
    return this.courseRepository.save(newCourse);
  }
}
