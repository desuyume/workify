import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DeleteFileOnErrorFilter } from './delete-file-on-error.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false })

  // app.enableCors({
  //   origin: process.env.CLIENT_URL,
  //   credentials: true
  // })
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )
  app.useGlobalFilters(new DeleteFileOnErrorFilter())

  await app.listen(process.env.BACKEND_PORT || 8000)
}
bootstrap()
