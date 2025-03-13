import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  // Find a user by email
  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Find a user by email
  async findUserBy(where: FindOptionsWhere<User>): Promise<User | null> {
    return this.userRepository.findOne({ where });
  }

  // Find a user by ID
  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Update user details
  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    await this.userRepository.update(id, updateUserDto);
    return this.findUserById(id);
  }

  // Delete a user
  async deleteUser(id: string) {
    return await this.userRepository.delete(id);
  }
}
