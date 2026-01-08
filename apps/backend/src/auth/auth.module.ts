import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { StorageService } from '@/storage/storage.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtService, StorageService]
})
export class AuthModule {}
