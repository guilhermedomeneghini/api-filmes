import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

if (process.env.NODE_ENV === 'test') {
  process.env.DATABASE_URL = process.env.DATABASE_URL_TEST
} else {
  process.env.DATABASE_URL = process.env.DATABASE_URL_PROD
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma