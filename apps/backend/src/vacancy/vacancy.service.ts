import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { IVacancyQuery, generateSlug, isNumber } from '@workify/shared'
import { CreateVacancyDto } from './dto/vacancy.dto'
import { StorageService } from '@/storage/storage.service'
import { StorageFileResponse } from '@/common/types/storage'
import { getFileName, getFileUrl } from '@/common/utils/storage'
import { calculateAvgRating } from '@/common/utils/rating'
import {
  and,
  asc,
  count,
  DatabaseClient,
  desc,
  eq,
  feedbacks,
  gte,
  inArray,
  lte,
  users,
  vacancies,
  VACANCY_STATUS,
  vacancyCategories,
  vacancyPhotos
} from '@workify/database'
import { DB_CLIENT } from '@/database/database.module'

@Injectable()
export class VacancyService {
  constructor(
    @Inject(DB_CLIENT) private db: DatabaseClient,
    private storageService: StorageService
  ) {}

  async getAll(query: IVacancyQuery) {
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 7
    const offset = (page - 1) * limit

    const conditions = [
      eq(vacancies.isVacancyHidden, false),
      eq(vacancies.status, VACANCY_STATUS.ACTIVE)
    ]

    if (query.city) conditions.push(eq(vacancies.cityName, query.city))
    if (query.cost_from) conditions.push(gte(vacancies.price, +query.cost_from))
    if (query.cost_to) conditions.push(lte(vacancies.price, +query.cost_to))

    if (query.category) {
      const cats = query.category
        .split('-')
        .map((id) => +id)
        .filter((id) => !isNaN(id))
      if (cats.length) conditions.push(inArray(vacancies.categoryId, cats))
    }

    const whereClause = and(...conditions)

    const [vacancyIdsResult, totalCountResult] = await Promise.all([
      this.db
        .select({ id: vacancies.id })
        .from(vacancies)
        .where(whereClause)
        .orderBy(desc(vacancies.createdAt))
        .limit(limit)
        .offset(offset),

      this.db.select({ count: count() }).from(vacancies).where(whereClause).limit(1)
    ])

    if (vacancyIdsResult.length === 0) {
      return {
        vacancies: [],
        totalPages: 0,
        totalCount: 0,
        currentPage: page,
        hasNextPage: false,
        hasPrevPage: false
      }
    }

    const vacancyIds = vacancyIdsResult.map((v) => v.id)

    const vacanciesData = (await Promise.all(vacancyIds.map((id) => this.getById(id)))).filter(
      (v) => v !== null
    )

    const totalCount = totalCountResult[0]?.count || 0
    const totalPages = Math.ceil(totalCount / limit)

    return {
      vacancies: vacanciesData,
      totalPages,
      totalCount,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  }

  async getById(id: number) {
    return await this.db.query.vacancies.findFirst({
      where: eq(vacancies.id, id),
      with: {
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
    if (dto.price && !isNumber(dto.price)) {
      throw new BadRequestException('Цена должна быть числом')
    }

    if (!dto.categoryId) {
      throw new BadRequestException('Необходимо выбрать категорию')
    }

    const [user] = await this.db.select().from(users).where(eq(users.id, id)).limit(1)

    if (!user) {
      throw new BadRequestException('Пользователь не найден')
    }

    const [vacancyCountResult] = await this.db
      .select({ count: count() })
      .from(vacancies)
      .where(eq(vacancies.userId, user.id))

    if (vacancyCountResult && vacancyCountResult.count >= 3) {
      throw new ForbiddenException('Вы не можете создать более 3 вакансий')
    }

    let vacancyCategoryId: number | null = null
    if (dto.categoryId) {
      const [category] = await this.db
        .select()
        .from(vacancyCategories)
        .where(eq(vacancyCategories.id, +dto.categoryId))
        .limit(1)

      if (!category) {
        throw new BadRequestException('Категория не найдена')
      }
      vacancyCategoryId = category.id
    }

    return await this.db.transaction(async (tx) => {
      let uploadedCover: StorageFileResponse | null = null
      if (cover) {
        uploadedCover = await this.storageService.upload(cover)
      }

      const [vacancy] = await tx
        .insert(vacancies)
        .values({
          title: dto.title,
          slug: generateSlug(dto.title),
          description: dto.description ?? null,
          categoryId: vacancyCategoryId,
          price: dto.price ?? null,
          cityName: dto.city ?? null,
          isLocationHidden: dto.isLocationHidden ?? false,
          isVacancyHidden: dto.isVacancyHidden ?? false,
          userId: user.id,
          cover: uploadedCover ? getFileUrl(uploadedCover.fileName) : null
        })
        .returning()

      if (!vacancy) {
        throw new BadRequestException('Не удалость создать вакансию')
      }

      if (photos && photos.length > 0) {
        const photosData = []
        let order = 0

        for (const photo of photos) {
          const uploadedPhoto = await this.storageService.upload(photo)
          photosData.push({
            url: getFileUrl(uploadedPhoto.fileName),
            vacancyId: vacancy.id,
            order: order++
          })
        }

        await tx.insert(vacancyPhotos).values(photosData)
      }

      const result = await tx.query.vacancies.findFirst({
        where: eq(vacancies.id, vacancy.id),
        with: {
          photos: true
        }
      })

      return result
    })
  }

  async update(
    id: number,
    vacancyId: number,
    dto: CreateVacancyDto,
    cover: Express.Multer.File | null,
    photos: Express.Multer.File[] | null
  ) {
    const [vacancy] = await this.db
      .select()
      .from(vacancies)
      .where(eq(vacancies.id, vacancyId))
      .limit(1)

    if (!vacancy) {
      throw new NotFoundException('Вакансия не найдена')
    }

    if (vacancy.userId !== id) {
      throw new ForbiddenException('Вы не можете редактировать эту вакансию')
    }

    if (dto.price && !isNumber(dto.price)) {
      throw new BadRequestException('Цена должна быть числом')
    }

    let categoryId: number | null = null
    if (dto.categoryId) {
      const [category] = await this.db
        .select()
        .from(vacancyCategories)
        .where(eq(vacancyCategories.id, +dto.categoryId))
        .limit(1)

      if (category) {
        categoryId = category.id
      }
    }

    return await this.db.transaction(async (tx) => {
      if (vacancy.cover) {
        await this.storageService.delete(getFileName(vacancy.cover))
      }

      const oldPhotos = await tx
        .select()
        .from(vacancyPhotos)
        .where(eq(vacancyPhotos.vacancyId, vacancyId))

      for (const photo of oldPhotos) {
        await this.storageService.delete(getFileName(photo.url))
      }
      await tx.delete(vacancyPhotos).where(eq(vacancyPhotos.vacancyId, vacancyId))

      let uploadedCover: StorageFileResponse | null = null
      if (cover) {
        uploadedCover = await this.storageService.upload(cover)
      }

      await tx
        .update(vacancies)
        .set({
          title: dto.title,
          slug: generateSlug(dto.title),
          description: dto.description ?? null,
          price: dto.price ?? null,
          cityName: dto.city ?? null,
          isLocationHidden: dto.isLocationHidden ?? false,
          isVacancyHidden: dto.isVacancyHidden ?? false,
          cover: uploadedCover ? getFileUrl(uploadedCover.fileName) : null,
          categoryId
        })
        .where(eq(vacancies.id, vacancyId))

      if (photos && photos.length > 0) {
        const photosData = []
        let order = 0

        for (const photo of photos) {
          const uploadedPhoto = await this.storageService.upload(photo)
          photosData.push({
            url: getFileUrl(uploadedPhoto.fileName),
            vacancyId: vacancyId,
            order: order++
          })
        }

        await tx.insert(vacancyPhotos).values(photosData)
      }

      const result = await tx.query.vacancies.findFirst({
        where: eq(vacancies.id, vacancyId),
        with: {
          photos: true
        }
      })

      return result
    })
  }

  async delete(userId: number, vacancyId: number) {
    const [vacancy] = await this.db
      .select()
      .from(vacancies)
      .where(eq(vacancies.id, vacancyId))
      .limit(1)

    if (!vacancy) {
      throw new NotFoundException('Vacancy not found')
    }

    if (vacancy.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this vacancy')
    }

    const photos = await this.db
      .select()
      .from(vacancyPhotos)
      .where(eq(vacancyPhotos.vacancyId, vacancyId))

    const deletePromises = []

    if (vacancy.cover) {
      deletePromises.push(this.storageService.delete(getFileName(vacancy.cover)))
    }

    for (const photo of photos) {
      deletePromises.push(this.storageService.delete(getFileName(photo.url)))
    }

    await Promise.all(deletePromises)

    return await this.db.transaction(async (tx) => {
      await tx.delete(vacancyPhotos).where(eq(vacancyPhotos.vacancyId, vacancyId))

      const [deletedVacancy] = await tx
        .delete(vacancies)
        .where(eq(vacancies.id, vacancyId))
        .returning()

      return deletedVacancy
    })
  }

  async getVacancyCategories() {
    return await this.db.select().from(vacancyCategories).orderBy(asc(vacancyCategories.id))
  }

  async updateRating(vacancyId: number) {
    const [vacancy] = await this.db
      .select()
      .from(vacancies)
      .where(eq(vacancies.id, vacancyId))
      .limit(1)
    if (!vacancy) {
      throw new NotFoundException('Вакансия не найдена')
    }

    return await this.db.transaction(async (tx) => {
      const currentVacancyFeedbacks = await tx
        .select({ rating: feedbacks.rating })
        .from(feedbacks)
        .where(eq(feedbacks.vacancyId, vacancyId))

      const avgCurrentVacancyRating = calculateAvgRating(currentVacancyFeedbacks)
      await tx
        .update(vacancies)
        .set({
          rating: avgCurrentVacancyRating
        })
        .where(eq(vacancies.id, vacancyId))

      const allExecutorsFeedbacks = await this.db
        .select({ rating: feedbacks.rating })
        .from(feedbacks)
        .innerJoin(vacancies, eq(feedbacks.vacancyId, vacancies.id))
        .where(eq(vacancies.userId, vacancy.userId))

      const avgAllExecutorsVacanciesRating = calculateAvgRating(allExecutorsFeedbacks)
      await tx
        .update(users)
        .set({
          rating: avgAllExecutorsVacanciesRating
        })
        .where(eq(users.id, vacancy.userId))

      return {
        vacancyRating: avgCurrentVacancyRating,
        userRating: avgAllExecutorsVacanciesRating
      }
    })
  }
}
