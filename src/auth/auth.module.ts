import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserRepository } from "src/user/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "./auth.jwtConstants";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,

        JwtModule.register({
            global:true,
             secret:'kkjddjdsijsksjsjsjimjfnfhfnfh',
            signOptions:{expiresIn:'1h'}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, UserRepository],
  })
  export class AuthModule {}