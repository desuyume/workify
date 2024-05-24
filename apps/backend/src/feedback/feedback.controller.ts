import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/feedback.dto';
import { IUserPayload } from '@workify/shared';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { DeleteFileOnErrorFilter } from '@/delete-file-on-error.filter';
import { multerOptions } from '@/config/multer.config';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post(':login')
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  @UseFilters(DeleteFileOnErrorFilter)
  async create(
    @Req() req,
    @Param('login') executorLogin: string,
    @Body() dto: CreateFeedbackDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    const { id: userId } = req.user as IUserPayload;
    return await this.feedbackService.create(userId, executorLogin, dto, photo);
  }
}
