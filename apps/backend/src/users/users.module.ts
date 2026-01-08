import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { JwtService } from '@nestjs/jwt'
import { StorageService } from '@/storage/storage.service'

@Module({
  providers: [UsersService, JwtService, StorageService],
  controllers: [UsersController]
})
export class UsersModule {}
