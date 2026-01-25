import { Module } from '@nestjs/common'
import { StatisticService } from './statistic.service'
import { StatisticController } from './statistic.controller'
import { JwtService } from '@nestjs/jwt'
import { DatabaseModule } from '@/database/database.module'

@Module({
  controllers: [StatisticController],
  providers: [StatisticService, JwtService],
  imports: [DatabaseModule]
})
export class StatisticModule {}
