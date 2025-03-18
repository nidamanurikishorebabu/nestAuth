
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/auth.jwtConstants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1]
      console.log("token:", token)
      if (!token) {
        throw new UnauthorizedException();
      }
      request.user = this.jwtService.verify(token)
      console.log("request:", request.user)
    } catch (err) {
      console.log(err)
      throw new UnauthorizedException()
    }

    return true;
  }
}
