import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { isArray } from 'class-validator'
import { Request, Response } from 'express'
import { removeFile } from './utils/removeFIle'

@Catch()
export class DeleteFileOnErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const getFiles = (files: Express.Multer.File[] | unknown | undefined) => {
      if (!files) return []
      if (isArray(files)) return files
      return Object.values(files)
    }

    const filePaths = getFiles(request.files)
    const file = request.file

    if (file) {
      removeFile(file.filename)
    }

    for (const file of filePaths) {
      if (isArray(file)) {
        for (const f of file) {
          removeFile(f.filename)
        }
      } else {
        removeFile(file.filename)
      }
    }

    const message = exception instanceof HttpException ? exception.message : 'Internal server error'

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message
    })
  }
}
