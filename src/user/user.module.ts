import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './user.services';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UsersService, UserRepository,JwtService],
})
export class UserModule { }
