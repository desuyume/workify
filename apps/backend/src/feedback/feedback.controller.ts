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
  UseInterceptors
} from '@nestjs/common'
import { FeedbackService } from './feedback.service'
import { CreateFeedbackDto } from './dto/feedback.dto'
import { FeedbackSortBy, IUserPayload } from '@workify/shared'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerOptions } from '@/config/multer.config'
import { JwtGuard } from '@/auth/guards/jwt.guard'

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @UseGuards(JwtGuard)
  @Post(':vacancyId')
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  async create(
    @Req() req,
    @Param('vacancyId') vacancyId: number,
    @Body() dto: CreateFeedbackDto,
    @UploadedFile() photo: Express.Multer.File
  ) {
    const { id: userId } = req.user as IUserPayload
    return await this.feedbackService.create(userId, vacancyId, dto, photo)
  }

  @UseGuards(JwtGuard)
  @Patch(':vacancyId/:feedbackId')
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  async update(
    @Param('vacancyId') vacancyId: number,
    @Param('feedbackId') feedbackId: number,
    @Body() dto: CreateFeedbackDto,
    @UploadedFile() photo: Express.Multer.File
  ) {
    return await this.feedbackService.update(vacancyId, feedbackId, dto, photo)
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteFeedback(@Req() req, @Param('id') feedbackId: number) {
    const { id: userId } = req.user as IUserPayload
    return await this.feedbackService.deleteFeedback(userId, feedbackId)
  }

  @Get('vacancy/:vacancyId')
  async getVacancyFeedbacks(
    @Param('vacancyId') vacancyId: number,
    @Query('sortBy') sortBy: FeedbackSortBy,
    @Query('take') take: number,
    @Query('skip') skip: number
  ) {
    return await this.feedbackService.getVacancyFeedbacks(vacancyId, sortBy, take, skip)
  }

  @Get(':vacancyId/rating')
  async getVacancyRatingsCount(@Param('vacancyId') vacancyId: number) {
    return await this.feedbackService.getVacancyRatingsCount(vacancyId)
  }

  @Get(':id')
  async getFeedbackById(@Param('id') id: number) {
    return await this.feedbackService.getFeedbackById(id)
  }

  @UseGuards(JwtGuard)
  @Get('created/:vacancyId')
  async getCreatedFeedback(@Req() req, @Param('vacancyId') vacancyId: number) {
    const { id: userId } = req.user as IUserPayload
    return await this.feedbackService.getCreatedFeedback(userId, vacancyId)
  }
}
