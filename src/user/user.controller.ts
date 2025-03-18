import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user-dto';
import { UsersService } from './user.services';
import { AuthGuard } from 'src/auth/auth.gurd';

@Controller('user/')
export class UserController {
  constructor(private readonly userService: UsersService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<{ message: string }> {
    return this.userService.register(createUserDto);
  }

  @Get('getUserById/:id')
  async getUserById(@Param('id') id: number): Promise<any> {
    return this.userService.getUserById(id);
  }


}
