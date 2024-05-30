import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService, JwtService],
})
export class FeedbackModule {}
