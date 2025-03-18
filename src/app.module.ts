import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig)
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }
