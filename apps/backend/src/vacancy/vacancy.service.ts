import { CUSTOM_PRISMA_SERVICE, CUSTOM_PRISMA_TYPE } from '@/constants/prisma.constants'
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { IVacancyQuery, isNumber } from '@workify/shared'
import { CreateVacancyDto } from './dto/vacancy.dto'
import { Prisma, VacancyCategory } from '@workify/database'
import { stringToBoolean } from '@workify/shared'
import { StorageService } from '@/storage/storage.service'
import { StorageFileResponse } from '@/types/storage'
import { getFileName, getFileUrl } from '@/utils/storage'
import { calculateAvgRating } from '@/utils/rating'

@Injectable()
export class VacancyService {
  constructor(
    @Inject(CUSTOM_PRISMA_SERVICE)
    private prisma: CUSTOM_PRISMA_TYPE,
    private storageService: StorageService
  ) { }

  async getAll(query: IVacancyQuery) {
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 7

    const filterOptions: Prisma.VacancyFindManyArgs = {
      include: {
        photos: true,
        user: true,
        category: true,
        city: true
      },
      where: {
        isVacancyHidden: false,
        OR: [
          { title: { contains: query.search || '', mode: 'insensitive' } },
          {
            description: { contains: query.search || '', mode: 'insensitive' }
          },
          {
            user: {
              name: { contains: query.search || '', mode: 'insensitive' }
            }
          },
          {
            user: {
              email: { contains: query.search || '', mode: 'insensitive' }
            }
          },
          {
            user: {
              login: { contains: query.search || '', mode: 'insensitive' }
            }
          }
        ]
      },
      take: limit,
      skip: (page - 1) * limit
    }

    if (!!query.cost_from || !!query.cost_to) {
      filterOptions.where = {
        ...filterOptions.where,
        price: {
          gte: Number(query.cost_from) || 0,
          lte: Number(query.cost_to) || Number.MAX_VALUE
        }
      }
    }

    if (!!query.category) {
      filterOptions.where = {
        ...filterOptions.where,
        vacancyCategoryId: {
          in: query.category.split('-').map((id) => parseInt(id))
        }
      }
    }

    if (!!query.city) {
      filterOptions.where = {
        ...filterOptions.where,
        cityName: query.city
      }
    }

    switch (query.sortBy) {
      case 'cost':
        filterOptions.orderBy = [
          { price: 'asc' },
          {
            FeedbackOnVacancy: {
              _count: 'desc'
            }
          },
          {
            user: {
              rating: 'desc'
            }
          }
        ]
        break
      case 'reviews':
        filterOptions.orderBy = [
          {
            FeedbackOnVacancy: {
              _count: 'desc'
            }
          },
          {
            user: {
              rating: 'desc'
            }
          }
        ]
        break
      case 'rating':
        filterOptions.orderBy = [
          {
            user: {
              rating: 'desc'
            }
          },
          {
            FeedbackOnVacancy: {
              _count: 'desc'
            }
          }
        ]
        break
      default:
        filterOptions.orderBy = [
          {
            FeedbackOnVacancy: {
              _count: 'desc'
            }
          },
          {
            user: {
              rating: 'desc'
            }
          }
        ]
        break
    }

    const [vacancies, count] = await this.prisma.client.$transaction([
      this.prisma.client.vacancy.findMany(filterOptions),
      this.prisma.client.vacancy.count({ where: filterOptions.where })
    ])

    return { vacancies, totalPages: Math.ceil(count / limit) }
  }

  async getById(id: number) {
    return await this.prisma.client.vacancy.findUnique({
      where: { id },
      include: {
        photos: true,
        category: true,
        city: true,
        user: true
      }
    })
  }

  async create(
    id: number,
    dto: CreateVacancyDto,
    cover: Express.Multer.File | null,
    photos: Express.Multer.File[] | null
  ) {
    if (!!dto.price && !isNumber(dto.price)) {
      throw new BadRequestException('Цена должна быть числом')
    }

    if (!dto.categoryId) {
      throw new BadRequestException('Необходимо выбрать категорию')
    }

    const user = await this.prisma.client.user.findUnique({
      where: {
        id
      }
    })

    const vacanciesCount = await this.prisma.client.vacancy.count({
      where: {
        userId: user.id
      }
    })

    if (vacanciesCount >= 3) {
      throw new ForbiddenException('Вы не можете создать более 3 вакансий')
    }

    let vacancyCategory: VacancyCategory | null = null
    if (dto.categoryId) {
      vacancyCategory = await this.prisma.client.vacancyCategory.findUnique({
        where: {
          id: +dto.categoryId
        }
      })
    }

    let uploadedCover: StorageFileResponse | null = null
    if (cover) {
      uploadedCover = await this.storageService.upload(cover)
    }

    const vacancy = await this.prisma.client.vacancy.create({
      data: {
        title: dto.title,
        description: dto.description ?? null,
        vacancyCategoryId: vacancyCategory?.id ?? null,
        price: +dto.price || null,
        cityName: dto.city ?? null,
        isLocationHidden: stringToBoolean(dto.isLocationHidden) ?? false,
        isVacancyHidden: stringToBoolean(dto.isVacancyHidden) ?? false,
        userId: user.id,
        cover: uploadedCover ? getFileUrl(uploadedCover.fileName) : null
      }
    })

    for (const photo of photos) {
      const uploadedPhoto = await this.storageService.upload(photo)
      await this.prisma.client.vacancyPhoto.create({
        data: {
          url: getFileUrl(uploadedPhoto.fileName),
          vacancyId: vacancy.id
        }
      })
    }

    return vacancy
  }

  async update(
    id: number,
    vacancyId: number,
    dto: CreateVacancyDto,
    cover: Express.Multer.File | null,
    photos: Express.Multer.File[] | null
  ) {
    const vacancy = await this.prisma.client.vacancy.findUnique({
      where: {
        id: vacancyId
      },
      include: {
        photos: true
      }
    })

    if (!vacancy) {
      throw new NotFoundException('Вакансия не найдена')
    }

    if (vacancy.userId !== id) {
      throw new ForbiddenException('Вы не можете редактировать эту вакансию')
    }

    if (!!dto.price && !isNumber(dto.price)) {
      throw new BadRequestException('Цена должна быть числом')
    }

    let vacancyCategory: VacancyCategory | null = null

    if (dto.categoryId) {
      vacancyCategory = await this.prisma.client.vacancyCategory.findUnique({
        where: {
          id: +dto.categoryId
        }
      })
    }

    if (vacancy.cover) {
      await this.storageService.delete(getFileName(vacancy.cover))
    }
    for (const photo of vacancy.photos) {
      await this.storageService.delete(getFileName(photo.url))
      await this.prisma.client.vacancyPhoto.delete({
        where: {
          id: photo.id
        }
      })
    }

    let uploadedCover: StorageFileResponse | null = null
    if (cover) {
      uploadedCover = await this.storageService.upload(cover)
    }

    const updatedVacancy = await this.prisma.client.vacancy.update({
      where: {
        id: vacancyId
      },
      data: {
        title: dto.title,
        description: dto.description ?? null,
        vacancyCategoryId: vacancyCategory?.id ?? null,
        price: +dto.price || null,
        cityName: dto.city ?? null,
        isLocationHidden: stringToBoolean(dto.isLocationHidden) ?? false,
        isVacancyHidden: stringToBoolean(dto.isVacancyHidden) ?? false,
        cover: uploadedCover ? getFileUrl(uploadedCover.fileName) : null
      }
    })

    for (const photo of photos) {
      const uploadedPhoto = await this.storageService.upload(photo)
      await this.prisma.client.vacancyPhoto.create({
        data: {
          url: getFileUrl(uploadedPhoto.fileName),
          vacancyId: vacancy.id
        }
      })
    }

    return updatedVacancy
  }

  async delete(userId: number, vacancyId: number) {
    const vacancy = await this.prisma.client.vacancy.findUnique({
      where: {
        id: vacancyId
      },
      include: {
        photos: true
      }
    })

    if (!vacancy) {
      throw new NotFoundException('Vacancy not found')
    }

    if (vacancy.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this vacancy')
    }

    if (vacancy.cover) {
      await this.storageService.delete(getFileName(vacancy.cover))
    }
    for (const photo of vacancy.photos) {
      await this.storageService.delete(getFileName(photo.url))
      await this.prisma.client.vacancyPhoto.delete({
        where: {
          id: photo.id
        }
      })
    }

    return await this.prisma.client.vacancy.delete({
      where: {
        id: vacancyId
      }
    })
  }

  async getVacancyCategories() {
    return await this.prisma.client.vacancyCategory.findMany({
      orderBy: {
        id: 'asc'
      }
    })
  }

  async updateRating(vacancyId: number) {
    const vacancy = await this.prisma.client.vacancy.findUnique({
      where: {
        id: vacancyId
      },
      select: {
        id: true,
        rating: true,
        userId: true
      }
    })
    if (!vacancy) {
      throw new NotFoundException('Вакансия не найдена')
    }

    const currentVacancyFeedbacks = await this.prisma.client.feedback.findMany({
      where: {
        FeedbackOnVacancy: {
          some: {
            vacancyId
          }
        }
      },
      select: {
        rating: true
      }
    })
    const avgCurrentVacancyRating = calculateAvgRating(currentVacancyFeedbacks)
    await this.prisma.client.vacancy.update({
      where: {
        id: vacancy.id
      },
      data: {
        rating: avgCurrentVacancyRating
      }
    })

    const allExecutorsFeedbacks = await this.prisma.client.feedback.findMany({
      where: {
        FeedbackOnVacancy: {
          some: {
            vacancy: {
              userId: vacancy.userId
            }
          }
        }
      },
      select: {
        rating: true
      }
    })
    const avgAllExecutorsVacancyRating = calculateAvgRating(allExecutorsFeedbacks)
    await this.prisma.client.user.update({
      where: {
        id: vacancy.userId
      },
      data: {
        rating: avgAllExecutorsVacancyRating
      }
    })
  }
}
