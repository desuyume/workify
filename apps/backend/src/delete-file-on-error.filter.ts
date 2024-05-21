import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response } from 'express';
import { removeFile } from './utils/removeFIle';

@Catch(BadRequestException)
export class DeleteFileOnErrorFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const getFiles = (files: Express.Multer.File[] | unknown | undefined) => {
      if (!files) return [];
      if (isArray(files)) return files;
      return Object.values(files);
    };

    const filePaths = getFiles(request.files);

    for (const file of filePaths) {
      if (isArray(file)) {
        for (const f of file) {
          removeFile(f.filename);
        }
      } else {
        removeFile(file.filename);
      }
    }
    response.status(status).json(exception.getResponse());
  }
}
