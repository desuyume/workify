import {
  CUSTOM_PRISMA_SERVICE,
  CUSTOM_PRISMA_TYPE,
} from '@/constants/prisma.constants';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class StatisticService {
  constructor(
    @Inject(CUSTOM_PRISMA_SERVICE)
    private prisma: CUSTOM_PRISMA_TYPE,
  ) {}

  async getStatistics() {
    const usersCount = await this.prisma.client.user.count();
    const feedbacksCount = await this.prisma.client.feedback.count();
    const satisfiedUsersCount = await this.prisma.client.feedback.count({
      where: {
        OR: [{ rating: 5 }, { rating: 4 }],
      },
    });
    const activeVacanciesCount = await this.prisma.client.vacancy.count({
      where: { isVacancyHidden: false },
    });

    return {
      usersCount,
      satisfiedUsersPercennt: Math.round(
        (satisfiedUsersCount / feedbacksCount) * 100,
      ),
      feedbacksCount,
      activeVacanciesCount,
    };
  }
}
