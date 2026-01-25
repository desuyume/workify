import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { DatabaseClient, getDbClient } from '@workify/database'

export const DB_CLIENT = 'DB_CLIENT'

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DB_CLIENT,
      useFactory: (configService: ConfigService): DatabaseClient => {
        return getDbClient(configService.get('DB_URL'))
      },
      inject: [ConfigService]
    }
  ],
  exports: [DB_CLIENT]
})
export class DatabaseModule {}
