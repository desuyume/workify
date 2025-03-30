import { CUSTOM_PRISMA_SERVICE, CUSTOM_PRISMA_TYPE } from '@/constants/prisma.constants'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CitiesService {
  constructor(
    @Inject(CUSTOM_PRISMA_SERVICE)
    private prisma: CUSTOM_PRISMA_TYPE
  ) {}

  async getCities(limit: number | undefined, search: string | undefined) {
    return await this.prisma.client.city.findMany({
      take: limit || undefined,
      where: {
        name: {
          contains: search || '',
          mode: 'insensitive'
        }
      },
      orderBy: { population: 'desc' }
    })
  }
}
