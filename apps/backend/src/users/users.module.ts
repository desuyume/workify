import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { JwtService } from '@nestjs/jwt'
import { StorageService } from '@/storage/storage.service'
import { DatabaseModule } from '@/database/database.module'

@Module({
  providers: [UsersService, JwtService, StorageService],
  controllers: [UsersController],
  imports: [DatabaseModule]
})
export class UsersModule {}
