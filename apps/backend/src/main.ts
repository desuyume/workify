import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(process.env.SERVER_PORT || 8000);
}
bootstrap();
