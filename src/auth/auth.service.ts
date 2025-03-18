import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { LoginDto } from 'src/dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ message: string; accessToken: string }> {
    const { email, password } = loginDto;
  
    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    // Generate JWT payload
    const payload = { userId: user.id, email: user.email };
  
    // Sign JWT token
    const accessToken = this.jwtService.sign(payload);
  
    // Return response with message and token
    return { message: 'Login successful', accessToken };
  }

  async getProfile(email: string): Promise<{ message: string; }> {
      const user = await this.userRepository.findByEmail(email);
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      return { message: `Welcome ${user.email}!`};
    }
  
}
