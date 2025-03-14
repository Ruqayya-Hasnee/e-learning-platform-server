import { RoleTypeEnum } from 'src/types/common';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column()
  password: string;

  @Column({ length: 255 })
  introduction: string;

  @Column({ length: 255 })
  education: string;

  @Column('text', { array: true })
  achievements: string[];

  @Column({ type: 'enum', enum: RoleTypeEnum, default: RoleTypeEnum.student })
  role: RoleTypeEnum = RoleTypeEnum.student;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
