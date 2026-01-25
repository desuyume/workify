import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { VacancyModule } from './vacancy/vacancy.module'
import { MulterModule } from '@nestjs/platform-express'
import { CitiesModule } from './cities/cities.module'
import * as path from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'
import { FeedbackModule } from './feedback/feedback.module'
import { StatisticModule } from './statistic/statistic.module'
import { StorageModule } from './storage/storage.module'

@Module({
  imports: [
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 15 * 60 * 1000, // 15 minutes
    //     limit: 100,
    //   },
    // ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../../.env', '.env']
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'static')
    }),
    MulterModule.register(),
    UsersModule,
    AuthModule,
    VacancyModule,
    CitiesModule,
    FeedbackModule,
    StatisticModule,
    StorageModule
  ]
})
export class AppModule {}
