import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { JwtService } from '@nestjs/jwt'
import { VacancyService } from '@/vacancy/vacancy.service'

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService, JwtService, VacancyService],
})
export class FeedbackModule {}
