import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService, JwtService],
})
export class StatisticModule {}
