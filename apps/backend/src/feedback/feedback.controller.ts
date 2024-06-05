import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/feedback.dto';
import { FeedbackSortBy, IUserPayload } from '@workify/shared';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '@/config/multer.config';
import { JwtGuard } from '@/auth/guards/jwt.guard';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @UseGuards(JwtGuard)
  @Post(':login')
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  async create(
    @Req() req,
    @Param('login') executorLogin: string,
    @Body() dto: CreateFeedbackDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    const { id: userId } = req.user as IUserPayload;
    return await this.feedbackService.create(userId, executorLogin, dto, photo);
  }

  @UseGuards(JwtGuard)
  @Patch(':login/:id')
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  async update(
    @Req() req,
    @Param('login') executorLogin: string,
    @Param('id') feedbackId: number,
    @Body() dto: CreateFeedbackDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    const { id: userId } = req.user as IUserPayload;
    return await this.feedbackService.update(userId, executorLogin, feedbackId, dto, photo);
  }

  @Get('executor/:login')
  async getExecutorFeedbacks(
    @Param('login') executorLogin: string,
    @Query('sortBy') sortBy: FeedbackSortBy,
    @Query('take') take: number,
    @Query('skip') skip: number,
  ) {
    return await this.feedbackService.getExecutorFeedbacks(
      executorLogin,
      sortBy,
      take,
      skip,
    );
  }

  @Get(':login/rating')
  async getExecutorRatingsCount(@Param('login') executorLogin: string) {
    return await this.feedbackService.getExecutorRatingsCount(executorLogin);
  }

  @Get(':id')
  async getFeedbackById(@Param('id') id: number) {
    return await this.feedbackService.getFeedbackById(id);
  }

  @UseGuards(JwtGuard)
  @Get('created/:login')
  async getCreatedFeedback(@Req() req, @Param('login') login: string) {
    const { id: userId } = req.user as IUserPayload;
    return await this.feedbackService.getCreatedFeedback(userId, login);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteFeedback(@Req() req, @Param('id') feedbackId: number) {
    const { id: userId } = req.user as IUserPayload;
    return await this.feedbackService.deleteFeedback(userId, feedbackId);
  }
}
