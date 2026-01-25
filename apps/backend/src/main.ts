import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false })

  if (process.env.NODE_ENV !== 'production') {
    app.enableCors({
      origin: process.env.CLIENT_URL,
      credentials: true
    })
  }
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      },
      whitelist: true
    })
  )

  await app.listen(process.env.BACKEND_PORT || 8000)
}
bootstrap()
