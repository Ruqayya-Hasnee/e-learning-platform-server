import { User } from 'src/modules/User/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  
  @Entity('courses')
  export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ length: 100 })
    title: string;
  
    @Column({ unique: true, length: 150 })
    description: string;
  
    @Column()
    price: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'created_by' })
    created_by: User;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  