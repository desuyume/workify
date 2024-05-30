import {
  BadRequestException,
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
        include: {
          customer: true,
        },
      };
    }

    return await this.prisma.client.feedback.findMany(filterOptions);
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
}
