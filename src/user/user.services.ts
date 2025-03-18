import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user-dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { plainToInstance } from 'class-transformer';                         //used for hide the sensitive data like passwords

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) { }

  async register(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const {email, password } = createUserDto;

    // Check if the user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userRepository.createUser(email, hashedPassword);

    return { message: 'User created successfully' };
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User ID ${id} not found`);
    }
    return plainToInstance(User,user) ;
  }

}

