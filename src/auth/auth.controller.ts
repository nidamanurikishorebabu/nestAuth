import { Controller, Post, Body, UseGuards, Get,Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/login-dto';
import { AuthGuard } from './auth.gurd';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

   @UseGuards(AuthGuard)
   @ApiBearerAuth('access-token')
  @Get('/profile')
  async getProfile(@Param('email') email: string): Promise<any> {
    return this.authService.getProfile(email);
  }

  
}
