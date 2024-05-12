import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CustomPrismaModule } from 'nestjs-prisma';
import { prisma } from '@workify/database';
import { CUSTOM_PRISMA_SERVICE } from './constants/prisma.constants';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomPrismaModule.forRoot({
      name: CUSTOM_PRISMA_SERVICE,
      client: prisma,
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
