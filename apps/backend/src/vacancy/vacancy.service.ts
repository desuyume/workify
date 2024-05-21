import {
  CUSTOM_PRISMA_SERVICE,
  CUSTOM_PRISMA_TYPE,
} from '@/constants/prisma.constants';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IVacancyQuery } from '@workify/shared';
import { CreateVacancyDto } from './dto/vacancy.dto';
import { VacancyCategory } from '@workify/database';
import { stringToBoolean } from '@workify/shared';

@Injectable()
export class VacancyService {
  constructor(
    @Inject(CUSTOM_PRISMA_SERVICE)
    private prisma: CUSTOM_PRISMA_TYPE,
  ) {}

  async getAll(query: IVacancyQuery) {
    const page = Number(query.page) || 1;
    return await this.prisma.client.vacancy.findMany({
      take: 7,
      skip: (page - 1) * 7,
      where: {
        OR: [
          { title: { contains: query.search || '', mode: 'insensitive' } },
          {
            description: { contains: query.search || '', mode: 'insensitive' },
          },
          {
            user: {
              name: { contains: query.search || '', mode: 'insensitive' },
            },
          },
          {
            user: {
              email: { contains: query.search || '', mode: 'insensitive' },
            },
          },
        ],
        price: {
          gte: Number(query.cost_from) || 0,
          lte: Number(query.cost_to) || Number.MAX_VALUE,
        },
        category: {
          title: {
            in: query.category ? query.category.split('-') : [],
          },
        },
      },
    });
  }

  async getById(id: number) {
    return await this.prisma.client.vacancy.findUnique({
      where: { id },
      include: {
        photos: true,
        category: true,
        city: true,
        user: true,
      },
    });
  }

  async create(
    id: number,
    dto: CreateVacancyDto,
    cover: Express.Multer.File | null,
    photos: Express.Multer.File[] | null,
  ) {
    const user = await this.prisma.client.user.findUnique({
      where: {
        id,
      },
    });

    let vacancyCategory: VacancyCategory | null = null;

    if (dto.categoryId) {
      vacancyCategory = await this.prisma.client.vacancyCategory.findUnique({
        where: {
          id: +dto.categoryId,
        },
      });
    }

    const vacancy = await this.prisma.client.vacancy.create({
      data: {
        title: dto.title,
        description: dto.description ?? null,
        vacancyCategoryId: vacancyCategory?.id ?? null,
        price: +dto.price ?? null,
        cityName: dto.city ?? null,
        isLocationHidden: stringToBoolean(dto.isLocationHidden) ?? false,
        isVacancyHidden: stringToBoolean(dto.isVacancyHidden) ?? false,
        userId: user.id,
        cover: cover?.filename ?? null,
      },
    });

    for (const photo of photos) {
      await this.prisma.client.vacancyPhoto.create({
        data: {
          url: photo.filename,
          vacancyId: vacancy.id,
        },
      });
    }

    return vacancy;
  }

  async getVacancyCategories() {
    return await this.prisma.client.vacancyCategory.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }
}
