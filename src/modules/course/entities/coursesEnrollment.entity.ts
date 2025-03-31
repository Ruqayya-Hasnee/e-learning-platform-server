import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from 'src/modules/User/entities/user.entity';
import { Course } from './course.entity';

@Entity('enrollCourse')
export class CoursesEnrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })  
  user: User;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })  
  course: Course;

  @CreateDateColumn()
  enrolled_at: Date;
}
