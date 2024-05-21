import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { IUserPayload, IVacancyQuery } from '@workify/shared';
import { CreateVacancyDto } from './dto/vacancy.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { multerOptions } from '@/config/multer.config';
import { DeleteFileOnErrorFilter } from '@/delete-file-on-error.filter';

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Get()
  async getAll(@Query() query: IVacancyQuery) {
    return await this.vacancyService.getAll(query);
  }

  @Get('getOne/:id')
  async getById(@Param('id') id: number) {
    return await this.vacancyService.getById(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'cover', maxCount: 1 },
        { name: 'photos', maxCount: 6 },
      ],
      multerOptions,
    ),
  )
  @UseFilters(DeleteFileOnErrorFilter)
  async create(
    @Req() req,
    @Body() dto: CreateVacancyDto,
    @UploadedFiles()
    files: { cover: Express.Multer.File[]; photos: Express.Multer.File[] },
  ) {
    const { id } = req.user as IUserPayload;
    const cover = files?.cover?.[0] || null;
    const photos = files?.photos || [];
    return await this.vacancyService.create(id, dto, cover, photos);
  }

  @Get('categories')
  async getVacancyCategories() {
    return await this.vacancyService.getVacancyCategories();
  }
}
