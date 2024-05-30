import {
  CUSTOM_PRISMA_SERVICE,
  CUSTOM_PRISMA_TYPE,
} from '@/constants/prisma.constants';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IVacancyQuery, isNumber } from '@workify/shared';
import { CreateVacancyDto } from './dto/vacancy.dto';
import { Prisma, VacancyCategory } from '@workify/database';
import { stringToBoolean } from '@workify/shared';
import { removeFile } from '@/utils/removeFIle';

@Injectable()
export class VacancyService {
  constructor(
    @Inject(CUSTOM_PRISMA_SERVICE)
    private prisma: CUSTOM_PRISMA_TYPE,
  ) {}

  async getAll(query: IVacancyQuery) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 7;

    let filterOptions: Prisma.VacancyFindManyArgs = {
      include: {
        photos: true,
        user: true,
        category: true,
        city: true,
      },
      where: {
        isVacancyHidden: false,
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
          {
            user: {
              login: { contains: query.search || '', mode: 'insensitive' },
            },
          },
        ],
      },
      take: limit,
      skip: (page - 1) * limit,
    };

    if (!!query.cost_from || !!query.cost_to) {
      filterOptions.where = {
        ...filterOptions.where,
        price: {
          gte: Number(query.cost_from) || 0,
          lte: Number(query.cost_to) || Number.MAX_VALUE,
        },
      };
    }

    if (!!query.category) {
      filterOptions.where = {
        ...filterOptions.where,
        vacancyCategoryId: {
          in: query.category.split('-').map((id) => parseInt(id)),
        },
      };
    }

    if (!!query.city) {
      filterOptions.where = {
        ...filterOptions.where,
        cityName: query.city,
      };
    }

    switch (query.sortBy) {
      case 'cost':
        filterOptions.orderBy = {
          price: 'asc',
        };
        break;
      case 'reviews':
        filterOptions.orderBy = {
          id: 'desc',
        };
        break;
      case 'rating':
        filterOptions.orderBy = {
          user: {
            rating: 'desc',
          },
        };
        break;
      default:
        break;
    }

    const [vacancies, count] = await this.prisma.client.$transaction([
      this.prisma.client.vacancy.findMany(filterOptions),
      this.prisma.client.vacancy.count({ where: filterOptions.where }),
    ]);

    return { vacancies, totalPages: Math.ceil(count / limit) };
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
    if (!!dto.price && !isNumber(dto.price)) {
      throw new BadRequestException('Цена должна быть числом');
    }

    const user = await this.prisma.client.user.findUnique({
      where: {
        id,
      },
    });

    const vacanciesCount = await this.prisma.client.vacancy.count({
      where: {
        userId: user.id,
      }
    })

    if (vacanciesCount == 2) {
      throw new ForbiddenException('Вы не можете создать более 2 вакансий');
    }

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

  async update(
    id: number,
    vacancyId: number,
    dto: CreateVacancyDto,
    cover: Express.Multer.File | null,
    photos: Express.Multer.File[] | null,
  ) {
    const vacancy = await this.prisma.client.vacancy.findUnique({
      where: {
        id: vacancyId,
      },
      include: {
        photos: true,
      },
    });

    if (!vacancy) {
      throw new NotFoundException('Vacancy not found');
    }

    if (vacancy.userId !== id) {
      throw new ForbiddenException('You are not allowed to edit this vacancy');
    }

    if (!!dto.price && !isNumber(dto.price)) {
      throw new BadRequestException('Price must be a number');
    }

    let vacancyCategory: VacancyCategory | null = null;

    if (dto.categoryId) {
      vacancyCategory = await this.prisma.client.vacancyCategory.findUnique({
        where: {
          id: +dto.categoryId,
        },
      });
    }

    if (!!vacancy.cover) {
      removeFile(vacancy.cover);
    }
    for (const photo of vacancy.photos) {
      removeFile(photo.url);
      await this.prisma.client.vacancyPhoto.delete({
        where: {
          id: photo.id,
        },
      });
    }

    const updatedVacancy = await this.prisma.client.vacancy.update({
      where: {
        id: vacancyId,
      },
      data: {
        title: dto.title,
        description: dto.description ?? null,
        vacancyCategoryId: vacancyCategory?.id ?? null,
        price: +dto.price ?? null,
        cityName: dto.city ?? null,
        isLocationHidden: stringToBoolean(dto.isLocationHidden) ?? false,
        isVacancyHidden: stringToBoolean(dto.isVacancyHidden) ?? false,
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

    return updatedVacancy;
  }

  async delete(userId: number, vacancyId: number) {
    const vacancy = await this.prisma.client.vacancy.findUnique({
      where: {
        id: vacancyId,
      },
      include: {
        photos: true,
      },
    });

    if (!vacancy) {
      throw new NotFoundException('Vacancy not found');
    }

    if (vacancy.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this vacancy',
      );
    }

    if (!!vacancy.cover) {
      removeFile(vacancy.cover);
    }
    for (const photo of vacancy.photos) {
      removeFile(photo.url);
      await this.prisma.client.vacancyPhoto.delete({
        where: {
          id: photo.id,
        },
      });
    }

    return await this.prisma.client.vacancy.delete({
      where: {
        id: vacancyId,
      },
    });
  }

  async getVacancyCategories() {
    return await this.prisma.client.vacancyCategory.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }
}
