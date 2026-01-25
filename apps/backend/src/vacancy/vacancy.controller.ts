import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { VacancyService } from './vacancy.service'
import { IUserPayload, IVacancyQuery } from '@workify/shared'
import { CreateVacancyDto } from './dto/vacancy.dto'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { JwtGuard } from '@/auth/guards/jwt.guard'
import { multerOptions } from '@/common/config/multer.config'
import { CurrentUser } from '@/common/decorators/user.decorator'

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Get()
  async getAll(@Query() query: IVacancyQuery) {
    return await this.vacancyService.getAll(query)
  }

  @Get('getOne/:id')
  async getById(@Param('id') id: number) {
    return await this.vacancyService.getById(id)
  }

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'cover', maxCount: 1 },
        { name: 'photos', maxCount: 6 }
      ],
      multerOptions
    )
  )
  async create(
    @CurrentUser() user: IUserPayload,
    @Body() dto: CreateVacancyDto,
    @UploadedFiles()
    files: { cover: Express.Multer.File[]; photos: Express.Multer.File[] }
  ) {
    const cover = files?.cover?.[0] || null
    const photos = files?.photos || []
    return await this.vacancyService.create(user.id, dto, cover, photos)
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'cover', maxCount: 1 },
        { name: 'photos', maxCount: 6 }
      ],
      multerOptions
    )
  )
  async update(
    @CurrentUser() user: IUserPayload,
    @Param('id') vacancyId: number,
    @Body() dto: CreateVacancyDto,
    @UploadedFiles()
    files: { cover: Express.Multer.File[]; photos: Express.Multer.File[] }
  ) {
    const cover = files?.cover?.[0] || null
    const photos = files?.photos || []
    return await this.vacancyService.update(user.id, vacancyId, dto, cover, photos)
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@CurrentUser() user: IUserPayload, @Param('id') vacancyId: number) {
    return await this.vacancyService.delete(user.id, vacancyId)
  }

  @Get('categories')
  async getVacancyCategories() {
    return await this.vacancyService.getVacancyCategories()
  }
}
