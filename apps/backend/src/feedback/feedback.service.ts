import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CUSTOM_PRISMA_SERVICE,
  CUSTOM_PRISMA_TYPE,
} from '@/constants/prisma.constants';
import { FeedbackSortBy } from '@workify/shared';
import { Prisma } from '@workify/database';
import { CreateFeedbackDto } from './dto/feedback.dto';
import { removeFile } from '@/utils/removeFIle';

@Injectable()
export class FeedbackService {
  constructor(
    @Inject(CUSTOM_PRISMA_SERVICE)
    private prisma: CUSTOM_PRISMA_TYPE,
  ) {}

  async create(
    userId: number,
    executorLogin: string,
    dto: CreateFeedbackDto,
    photo: Express.Multer.File,
  ) {
    const executor = await this.prisma.client.user.findUnique({
      where: { login: executorLogin },
    });

    if (!executor) {
      throw new NotFoundException('Исполнитель не найден');
    }

    // const feedbackInDb = await this.prisma.client.feedback.findFirst({
    //   where: {
    //     customerId: userId,
    //     FeedbackOnUsers: {
    //       some: {
    //         executorId: executor.id,
    //       },
    //     },
    //   },
    // });

    // if (feedbackInDb) {
    //   throw new BadRequestException(
    //     'Вы уже оставляли отзыв на этого исполнителя',
    //   );
    // }

    const feedback = await this.prisma.client.feedback.create({
      data: {
        comment: dto.comment,
        customerId: userId,
        rating: +dto.rating ?? 0,
        photo: photo?.filename ?? null,
      },
    });

    await this.prisma.client.feedbackOnUsers.create({
      data: {
        feedbackId: feedback.id,
        executorId: executor.id,
      },
    });

    // update average executor rating
    const feedbacks = await this.prisma.client.feedback.findMany({
      where: {
        FeedbackOnUsers: {
          some: {
            executorId: executor.id,
          },
        },
      },
    });
    const avgRating =
      feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
      feedbacks.length;
    await this.prisma.client.user.update({
      where: {
        id: executor.id,
      },
      data: {
        rating: avgRating,
      },
    });

    return feedback;
  }

  async getExecutorFeedbacks(
    executorLogin: string,
    sortBy: FeedbackSortBy,
    take?: number,
    skip?: number,
  ) {
    const executor = await this.prisma.client.user.findUnique({
      where: { login: executorLogin },
    });

    if (!executor) {
      throw new NotFoundException('Исполнитель не найден');
    }

    let filterOptions: Prisma.FeedbackFindManyArgs = {
      where: {
        FeedbackOnUsers: {
          some: {
            executorId: executor.id,
          },
        },
      },
      include: {
        customer: true,
      },
    };

    switch (sortBy) {
      case 'date':
        filterOptions = {
          ...filterOptions,
          orderBy: {
            date_created: 'desc',
          },
        };
        break;
      case 'rating':
        filterOptions = {
          ...filterOptions,
          orderBy: {
            rating: 'desc',
          },
        };
        break;
      default:
        break;
    }

    if (!!take) {
      filterOptions = {
        ...filterOptions,
        take,
      };
    }

    if (!!skip) {
      filterOptions = {
        ...filterOptions,
        skip,
      };
    }

    const [feedbacks, count] = await this.prisma.client.$transaction([
      this.prisma.client.feedback.findMany(filterOptions),
      this.prisma.client.feedback.count({ where: filterOptions.where }),
    ]);

    return { feedbacks, count };
  }

  async getExecutorRatingsCount(executorLogin: string) {
    const executor = await this.prisma.client.user.findUnique({
      where: { login: executorLogin },
    });

    if (!executor) {
      throw new NotFoundException('Исполнитель не найден');
    }

    const feedbacks = await this.prisma.client.feedback.findMany({
      where: {
        FeedbackOnUsers: {
          some: {
            executorId: executor.id,
          },
        },
      },
    });

    return {
      1: feedbacks.filter((feedback) => feedback.rating === 1).length,
      2: feedbacks.filter((feedback) => feedback.rating === 2).length,
      3: feedbacks.filter((feedback) => feedback.rating === 3).length,
      4: feedbacks.filter((feedback) => feedback.rating === 4).length,
      5: feedbacks.filter((feedback) => feedback.rating === 5).length,
    };
  }

  async getFeedbackById(id: number) {
    const feedback = await this.prisma.client.feedback.findUnique({
      where: { id },
      include: {
        customer: true,
        FeedbackOnUsers: {
          select: {
            executor: {
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
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!feedback) {
      throw new NotFoundException('Отзыв не найден');
    }

    return { ...feedback, executor: feedback.FeedbackOnUsers[0].executor };
  }

  async deleteFeedback(userId: number, feedbackId: number) {
    const feedback = await this.prisma.client.feedback.findUnique({
      where: { id: feedbackId },
      include: {
        FeedbackOnUsers: {
          select: {
            executor: {
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
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!feedback) {
      throw new NotFoundException('Отзыв не найден');
    }

    if (feedback.customerId !== userId) {
      throw new ForbiddenException('Нельзя удалить чужой отзыв');
    }

    await this.prisma.client.feedbackOnUsers.deleteMany({
      where: { feedbackId },
    });
    await this.prisma.client.feedback.delete({ where: { id: feedbackId } });

    if (!!feedback.photo) {
      removeFile(feedback.photo);
    }

    return { ...feedback, executor: feedback.FeedbackOnUsers[0].executor };
  }
}
