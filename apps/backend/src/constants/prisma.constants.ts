import { PrismaClient } from '@workify/database'
import { CustomPrismaService } from 'nestjs-prisma'

export const CUSTOM_PRISMA_SERVICE = 'CustomPrismaService'
export type CUSTOM_PRISMA_TYPE = CustomPrismaService<PrismaClient>
