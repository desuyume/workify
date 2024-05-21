import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [VacancyService, JwtService],
  controllers: [VacancyController],
})
export class VacancyModule {}
