import { Inject, Injectable } from '@nestjs/common'
import { DB_CLIENT } from '@/database/database.module'
import { count, DatabaseClient, eq, feedbacks, or, users, vacancies } from '@workify/database'

@Injectable()
export class StatisticService {
  constructor(@Inject(DB_CLIENT) private db: DatabaseClient) {}

  async getStatistics() {
    const [usersCount] = await this.db.select({ count: count() }).from(users)
    const [feedbacksCount] = await this.db.select({ count: count() }).from(feedbacks)
    const [satisfiedUsersCount] = await this.db
      .select({ count: count() })
      .from(feedbacks)
      .where(or(eq(feedbacks.rating, 5), eq(feedbacks.rating, 4)))
    const [activeVacanciesCount] = await this.db
      .select({ count: count() })
      .from(vacancies)
      .where(eq(vacancies.isVacancyHidden, false))

    return {
      usersCount: usersCount?.count,
      satisfiedUsersPercennt: Math.round(
        ((satisfiedUsersCount?.count ?? 0) / (feedbacksCount?.count ?? 0)) * 100
      ),
      feedbacksCount: feedbacksCount?.count,
      activeVacanciesCount: activeVacanciesCount?.count
    }
  }
}
