import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/feedback.dto';
import { FeedbackSortBy, IUserPayload } from '@workify/shared';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteFileOnErrorFilter } from '@/delete-file-on-error.filter';
import { multerOptions } from '@/config/multer.config';
import { JwtGuard } from '@/auth/guards/jwt.guard';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @UseGuards(JwtGuard)
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

  @Get(':login')
  async getExecutorFeedbacks(
    @Param('login') executorLogin: string,
    @Query('sortBy') sortBy: FeedbackSortBy,
    @Query('take') take: number,
  ) {
    return await this.feedbackService.getExecutorFeedbacks(
      executorLogin,
      sortBy,
      take,
    );
  }

  @Get(':login/rating')
  async getExecutorRatingsCount(@Param('login') executorLogin: string) {
    return await this.feedbackService.getExecutorRatingsCount(executorLogin);
  }
}
