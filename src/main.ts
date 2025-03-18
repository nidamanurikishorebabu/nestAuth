import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true
  });

  const config = new DocumentBuilder()
    .setTitle('User Authentication')
    .setDescription('User Api description')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // 👈 Ensure this part is included
      },
      'access-token'
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  app.useGlobalPipes(new ValidationPipe())                    //enable the global validation
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
