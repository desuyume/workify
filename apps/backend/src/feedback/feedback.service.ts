import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { CUSTOM_PRISMA_SERVICE, CUSTOM_PRISMA_TYPE } from '@/constants/prisma.constants'
import { FeedbackSortBy } from '@workify/shared'
import { Prisma } from '@workify/database'
import { CreateFeedbackDto } from './dto/feedback.dto'
import { removeFile } from '@/utils/removeFIle'
import { VacancyService } from '@/vacancy/vacancy.service'

@Injectable()
export class FeedbackService {
  constructor(
    @Inject(CUSTOM_PRISMA_SERVICE)
    private prisma: CUSTOM_PRISMA_TYPE,
    private vacancyService: VacancyService
  ) {}

  async create(
    userId: number,
    vacancyId: number,
    dto: CreateFeedbackDto,
    photo: Express.Multer.File
  ) {
    const vacancy = await this.prisma.client.vacancy.findUnique({
      where: { id: vacancyId },
      select: { id: true, userId: true }
    })

    if (!vacancy) {
      throw new NotFoundException('Вакансия не найдена')
    }

    const feedbackInDb = await this.prisma.client.feedback.findFirst({
      where: {
        customerId: userId,
        FeedbackOnVacancy: {
          some: {
            vacancyId: vacancy.id
          }
        }
      }
    })

    if (feedbackInDb) {
      throw new BadRequestException('Вы уже оставляли отзыв на эту вакансию')
    }

    const feedback = await this.prisma.client.feedback.create({
      data: {
        comment: dto.comment,
        customerId: userId,
        rating: dto.rating ?? 0,
        photo: photo?.filename ?? null
      }
    })

    await this.prisma.client.feedbackOnVacancy.create({
      data: {
        feedbackId: feedback.id,
        vacancyId: vacancy.id
      }
    })

    // update average executor rating
    await this.vacancyService.updateRating(vacancy.id)

    return feedback
  }

  async update(
    vacancyId: number,
    feedbackId: number,
    dto: CreateFeedbackDto,
    photo: Express.Multer.File
  ) {
    const vacancy = await this.prisma.client.vacancy.findUnique({
      where: { id: vacancyId },
      select: { id: true, userId: true }
    })

    if (!vacancy) {
      throw new NotFoundException('Вакансия не найден')
    }

    const feedback = await this.prisma.client.feedback.findFirst({
      where: {
        id: feedbackId
      }
    })

    if (!feedback) {
      throw new BadRequestException('Вы не оставляли отзыв на эту вакансию')
    }

    if (!!feedback.photo) {
      await removeFile(feedback.photo)
    }

    const updatedFeedback = await this.prisma.client.feedback.update({
      where: {
        id: feedbackId
      },
      data: {
        comment: dto.comment,
        rating: dto.rating ?? 0,
        photo: photo?.filename ?? null
      }
    })

    // update average executor rating
    await this.vacancyService.updateRating(vacancy.id)

    return updatedFeedback
  }

  async deleteFeedback(userId: number, feedbackId: number) {
    const feedback = await this.prisma.client.feedback.findUnique({
      where: { id: feedbackId },
      include: {
        FeedbackOnVacancy: {
          select: {
            vacancy: {
              include: {
                user: {
                  select: {
                    id: true,
                    login: true,
                    email: true,
                    name: true,
                    avatar: true,
                    birthday: true,
                    description: true,
                    phone: true,
                    specialisation: true,
                    vacancies: {
                      include: {
                        user: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!feedback) {
      throw new NotFoundException('Отзыв не найден')
    }

    if (feedback.customerId !== userId) {
      throw new ForbiddenException('Нельзя удалить чужой отзыв')
    }

    await this.prisma.client.feedbackOnVacancy.deleteMany({
      where: { feedbackId }
    })
    await this.prisma.client.feedback.delete({ where: { id: feedbackId } })

    if (!!feedback.photo) {
      removeFile(feedback.photo)
    }

    // update average executor rating
    await this.vacancyService.updateRating(feedback.FeedbackOnVacancy[0].vacancy.id)

    return {
      ...feedback,
      executor: feedback.FeedbackOnVacancy[0].vacancy.user,
      vacancy: feedback.FeedbackOnVacancy[0].vacancy
    }
  }

  async getVacancyFeedbacks(
    vacancyId: number,
    sortBy: FeedbackSortBy,
    take?: number,
    skip?: number
  ) {
    const vacancy = await this.prisma.client.vacancy.findUnique({
      where: { id: vacancyId },
      select: { id: true }
    })

    if (!vacancy) {
      throw new NotFoundException('Вакансия не найдена')
    }

    let filterOptions: Prisma.FeedbackFindManyArgs = {
      where: {
        FeedbackOnVacancy: {
          some: {
            vacancyId: vacancy.id
          }
        }
      },
      include: {
        customer: true
      }
    }

    switch (sortBy) {
      case 'date':
        filterOptions = {
          ...filterOptions,
          orderBy: {
            date_created: 'desc'
          }
        }
        break
      case 'rating':
        filterOptions = {
          ...filterOptions,
          orderBy: {
            rating: 'desc'
          }
        }
        break
      default:
        break
    }

    if (!!take) {
      filterOptions = {
        ...filterOptions,
        take
      }
    }

    if (!!skip) {
      filterOptions = {
        ...filterOptions,
        skip
      }
    }

    const [feedbacks, count] = await this.prisma.client.$transaction([
      this.prisma.client.feedback.findMany(filterOptions),
      this.prisma.client.feedback.count({ where: filterOptions.where })
    ])

    return { feedbacks, count }
  }

  async getVacancyRatingsCount(vacancyId: number) {
    const vacancy = await this.prisma.client.vacancy.findUnique({
      where: { id: vacancyId },
      select: { id: true }
    })

    if (!vacancy) {
      throw new NotFoundException('Вакансия не найдена')
    }

    const feedbacks = await this.prisma.client.feedback.findMany({
      where: {
        FeedbackOnVacancy: {
          some: {
            vacancyId: vacancy.id
          }
        }
      }
    })

    return {
      1: feedbacks.filter((feedback) => feedback.rating === 1).length,
      2: feedbacks.filter((feedback) => feedback.rating === 2).length,
      3: feedbacks.filter((feedback) => feedback.rating === 3).length,
      4: feedbacks.filter((feedback) => feedback.rating === 4).length,
      5: feedbacks.filter((feedback) => feedback.rating === 5).length
    }
  }

  async getFeedbackById(id: number) {
    const feedback = await this.prisma.client.feedback.findUnique({
      where: { id },
      include: {
        customer: true,
        FeedbackOnVacancy: {
          select: {
            vacancy: {
              include: {
                user: {
                  select: {
                    id: true,
                    login: true,
                    email: true,
                    name: true,
                    avatar: true,
                    birthday: true,
                    description: true,
                    phone: true,
                    specialisation: true,
                    vacancies: {
                      include: {
                        user: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!feedback) {
      throw new NotFoundException('Отзыв не найден')
    }

    return {
      ...feedback,
      executor: feedback.FeedbackOnVacancy[0].vacancy.user,
      vacancy: feedback.FeedbackOnVacancy[0].vacancy
    }
  }

  async getCreatedFeedback(userId: number, vacancyId: number) {
    const vacancy = await this.prisma.client.vacancy.findUnique({
      where: { id: vacancyId },
      select: { id: true }
    })

    if (!vacancy) {
      throw new NotFoundException('Вакансия не найдена')
    }

    const feedbacks = await this.prisma.client.feedback.findMany({
      where: {
        customerId: userId,
        FeedbackOnVacancy: {
          some: {
            vacancy: {
              id: vacancy.id
            }
          }
        }
      },
      include: {
        customer: true,
        FeedbackOnVacancy: {
          select: {
            vacancy: {
              select: {
                user: {
                  select: {
                    id: true,
                    login: true,
                    email: true,
                    name: true,
                    avatar: true,
                    birthday: true,
                    description: true,
                    phone: true,
                    specialisation: true,
                    vacancies: {
                      include: {
                        user: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    })

    return feedbacks.length > 0 ? feedbacks[0] : null
  }
}
