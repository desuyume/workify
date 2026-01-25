import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { FeedbackSortBy } from '@workify/shared'
import { and, count, DatabaseClient, desc, eq, feedbacks, vacancies } from '@workify/database'
import { CreateFeedbackDto } from './dto/feedback.dto'
import { VacancyService } from '@/vacancy/vacancy.service'
import { StorageService } from '@/storage/storage.service'
import { StorageFileResponse } from '@/common/types/storage'
import { getFileName, getFileUrl } from '@/common/utils/storage'
import { DB_CLIENT } from '@/database/database.module'

@Injectable()
export class FeedbackService {
  constructor(
    @Inject(DB_CLIENT) private db: DatabaseClient,
    private vacancyService: VacancyService,
    private storageService: StorageService
  ) {}

  async create(
    userId: number,
    vacancyId: number,
    dto: CreateFeedbackDto,
    photo: Express.Multer.File
  ) {
    const [vacancy] = await this.db
      .select()
      .from(vacancies)
      .where(eq(vacancies.id, vacancyId))
      .limit(1)

    if (!vacancy) {
      throw new NotFoundException('Вакансия не найдена')
    }

    const [feedbackInDb] = await this.db
      .select()
      .from(feedbacks)
      .where(and(eq(feedbacks.customerId, userId), eq(feedbacks.vacancyId, vacancy.id)))
      .limit(1)

    if (feedbackInDb) {
      throw new BadRequestException('Вы уже оставляли отзыв на эту вакансию')
    }

    return await this.db.transaction(async (tx) => {
      let uploadedPhoto: StorageFileResponse | null = null
      if (photo) {
        uploadedPhoto = await this.storageService.upload(photo)
      }
      const [feedback] = await tx
        .insert(feedbacks)
        .values({
          comment: dto.comment,
          rating: dto.rating ?? 0,
          photo: uploadedPhoto ? getFileUrl(uploadedPhoto.fileName) : null,
          customerId: userId,
          vacancyId: vacancy.id
        })
        .returning()

      if (!feedback) {
        throw new BadRequestException('Не удалось создать отзыв')
      }

      await this.vacancyService.updateRating(vacancy.id)

      return feedback
    })
  }

  async update(
    vacancyId: number,
    feedbackId: number,
    dto: CreateFeedbackDto,
    photo: Express.Multer.File
  ) {
    const [vacancy] = await this.db
      .select()
      .from(vacancies)
      .where(eq(vacancies.id, vacancyId))
      .limit(1)

    if (!vacancy) {
      throw new NotFoundException('Вакансия не найдена')
    }

    const [feedback] = await this.db
      .select()
      .from(feedbacks)
      .where(eq(feedbacks.id, feedbackId))
      .limit(1)

    if (!feedback) {
      throw new BadRequestException('Вы не оставляли отзыв на эту вакансию')
    }

    return await this.db.transaction(async (tx) => {
      if (feedback.photo) {
        await this.storageService.delete(getFileName(feedback.photo))
      }

      let uploadedPhoto: StorageFileResponse | null = null
      if (photo) {
        uploadedPhoto = await this.storageService.upload(photo)
      }
      const [updatedFeedback] = await tx
        .update(feedbacks)
        .set({
          comment: dto.comment,
          rating: dto.rating ?? 0,
          photo: uploadedPhoto ? getFileUrl(uploadedPhoto.fileName) : null
        })
        .where(eq(feedbacks.id, feedbackId))
        .returning()

      if (!updatedFeedback) {
        throw new BadRequestException('Не удалось обновить отзыв')
      }

      await this.vacancyService.updateRating(vacancy.id)

      return updatedFeedback
    })
  }

  async deleteFeedback(userId: number, feedbackId: number) {
    const [feedback] = await this.db
      .select()
      .from(feedbacks)
      .where(eq(feedbacks.id, feedbackId))
      .limit(1)
    if (!feedback) {
      throw new NotFoundException('Отзыв не найден')
    }

    if (feedback.customerId !== userId) {
      throw new ForbiddenException('Нельзя удалить чужой отзыв')
    }

    return await this.db.transaction(async (tx) => {
      await tx.delete(feedbacks).where(eq(feedbacks.id, feedbackId))

      if (feedback.photo) {
        await this.storageService.delete(getFileName(feedback.photo))
      }

      await this.vacancyService.updateRating(feedback.vacancyId)

      const updatedVacancy = await tx.query.vacancies.findFirst({
        where: eq(vacancies.id, feedback.vacancyId),
        with: {
          user: true
        }
      })
      if (!updatedVacancy) {
        throw new NotFoundException('Вакансия не найдена')
      }

      return {
        ...feedback,
        executor: updatedVacancy.user,
        vacancy: updatedVacancy
      }
    })
  }

  async getVacancyFeedbacks(
    vacancyId: number,
    sortBy: FeedbackSortBy,
    take?: number,
    skip?: number
  ) {
    const vacancy = await this.db.query.vacancies.findFirst({
      where: eq(vacancies.id, vacancyId),
      columns: {
        id: true
      }
    })

    if (!vacancy) {
      throw new NotFoundException('Вакансия не найдена')
    }

    const orderBy = sortBy === 'date' ? desc(feedbacks.createdAt) : desc(feedbacks.rating)

    const feedbacksList = await this.db.query.feedbacks.findMany({
      where: eq(feedbacks.vacancyId, vacancyId),
      with: {
        customer: true
      },
      orderBy,
      limit: take,
      offset: skip
    })
    const [countResult] = await this.db
      .select({ count: count() })
      .from(feedbacks)
      .where(eq(feedbacks.vacancyId, vacancyId))

    return { feedbacks: feedbacksList, count: countResult?.count ?? 0 }
  }

  async getVacancyRatingsCount(vacancyId: number) {
    const vacancy = await this.db.query.vacancies.findFirst({
      where: eq(vacancies.id, vacancyId),
      columns: {
        id: true
      }
    })

    if (!vacancy) {
      throw new NotFoundException('Вакансия не найдена')
    }

    const feedbacksList = await this.db.query.feedbacks.findMany({
      where: eq(feedbacks.vacancyId, vacancyId)
    })

    return {
      1: feedbacksList.filter((feedback) => feedback.rating === 1).length,
      2: feedbacksList.filter((feedback) => feedback.rating === 2).length,
      3: feedbacksList.filter((feedback) => feedback.rating === 3).length,
      4: feedbacksList.filter((feedback) => feedback.rating === 4).length,
      5: feedbacksList.filter((feedback) => feedback.rating === 5).length
    }
  }

  async getFeedbackById(id: number) {
    const feedback = await this.db.query.feedbacks.findFirst({
      where: eq(feedbacks.id, id),
      with: {
        vacancy: {
          with: {
            user: true
          }
        }
      }
    })

    if (!feedback) {
      throw new NotFoundException('Отзыв не найден')
    }

    return {
      ...feedback,
      executor: feedback.vacancy.user,
      vacancy: feedback.vacancy
    }
  }

  async getCreatedFeedback(userId: number, vacancyId: number) {
    const vacancy = await this.db.query.vacancies.findFirst({
      where: eq(vacancies.id, vacancyId),
      columns: {
        id: true
      }
    })

    if (!vacancy) {
      throw new NotFoundException('Вакансия не найдена')
    }

    const createdFeedbacks = await this.db.query.feedbacks.findMany({
      where: and(eq(feedbacks.vacancyId, vacancyId), eq(feedbacks.customerId, userId)),
      with: {
        vacancy: {
          with: {
            user: true
          }
        }
      }
    })

    return createdFeedbacks.length > 0 ? createdFeedbacks[0] : null
  }
}
