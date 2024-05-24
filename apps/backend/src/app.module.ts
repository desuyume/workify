import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CustomPrismaModule } from 'nestjs-prisma';
import { PrismaClient, prisma } from '@workify/database';
import { CUSTOM_PRISMA_SERVICE } from './constants/prisma.constants';
import { ConfigModule } from '@nestjs/config';
import { VacancyModule } from './vacancy/vacancy.module';
import { MulterModule } from '@nestjs/platform-express';
import { CitiesModule } from './cities/cities.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FeedbackModule } from './feedback/feedback.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 15 * 60 * 1000, // 15 minutes
    //     limit: 100,
    //   },
    // ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'static'),
    }),
    CustomPrismaModule.forRoot({
      name: CUSTOM_PRISMA_SERVICE,
      client: new PrismaClient(),
      isGlobal: true,
    }),
    MulterModule.register({ dest: process.env.UPLOAD_LOCATION }),
    UsersModule,
    AuthModule,
    VacancyModule,
    CitiesModule,
    FeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
