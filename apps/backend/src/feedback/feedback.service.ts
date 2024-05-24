import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CUSTOM_PRISMA_SERVICE,
  CUSTOM_PRISMA_TYPE,
} from '@/constants/prisma.constants';

@Injectable()
export class FeedbackService {
  constructor(
    @Inject(CUSTOM_PRISMA_SERVICE)
    private prisma: CUSTOM_PRISMA_TYPE,
  ) {}

  async create(
    userId: number,
    executorLogin: string,
    dto: any,
    photo: Express.Multer.File,
  ) {
    const executor = await this.prisma.client.user.findUnique({
      where: { login: executorLogin },
    });

    if (!executor) {
      throw new NotFoundException('Executor not found');
    }

    const feedback = await this.prisma.client.feedback.create({
      data: {
        comment: dto.comment,
        customerId: userId,
        rating: dto.rating ?? 0,
        photo: photo?.filename ?? null,
      },
    });

    await this.prisma.client.feedbackOnUsers.create({
      data: {
        feedbackId: feedback.id,
        executorId: executor.id,
      },
    });

    return feedback;
  }
}
