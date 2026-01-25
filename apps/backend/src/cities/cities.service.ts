import { DB_CLIENT } from '@/database/database.module'
import { Inject, Injectable } from '@nestjs/common'
import { cities, DatabaseClient, desc, ilike } from '@workify/database'

@Injectable()
export class CitiesService {
  constructor(@Inject(DB_CLIENT) private db: DatabaseClient) {}

  async getCities(limit: number | undefined, search: string | undefined) {
    const querySearch = search ?? ''
    const queryLimit = Number(limit) ?? 0
    const citiesResult = await this.db.query.cities.findMany({
      where: ilike(cities.name, `%${querySearch.trim()}%`),
      limit: queryLimit,
      orderBy: desc(cities.population)
    })
    return citiesResult
  }
}
