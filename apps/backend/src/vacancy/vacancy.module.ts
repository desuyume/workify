import { Module } from '@nestjs/common'
import { VacancyService } from './vacancy.service'
import { VacancyController } from './vacancy.controller'
import { JwtService } from '@nestjs/jwt'
import { StorageService } from '@/storage/storage.service'

@Module({
  providers: [VacancyService, JwtService, StorageService],
  controllers: [VacancyController],
  exports: [VacancyService]
})
export class VacancyModule {}
