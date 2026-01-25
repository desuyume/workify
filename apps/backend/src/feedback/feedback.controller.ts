import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { FeedbackService } from './feedback.service'
import { CreateFeedbackDto } from './dto/feedback.dto'
import { FeedbackSortBy, IUserPayload } from '@workify/shared'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerOptions } from '@/common/config/multer.config'
import { JwtGuard } from '@/auth/guards/jwt.guard'
import { CurrentUser } from '@/common/decorators/user.decorator'

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @UseGuards(JwtGuard)
  @Post(':vacancyId')
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  async create(
    @CurrentUser() user: IUserPayload,
    @Param('vacancyId') vacancyId: number,
    @Body() dto: CreateFeedbackDto,
    @UploadedFile() photo: Express.Multer.File
  ) {
    return await this.feedbackService.create(user.id, vacancyId, dto, photo)
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
  async deleteFeedback(@CurrentUser() user: IUserPayload, @Param('id') feedbackId: number) {
    return await this.feedbackService.deleteFeedback(user.id, feedbackId)
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
  async getCreatedFeedback(
    @CurrentUser() user: IUserPayload,
    @Param('vacancyId') vacancyId: number
  ) {
    return await this.feedbackService.getCreatedFeedback(user.id, vacancyId)
  }
}
