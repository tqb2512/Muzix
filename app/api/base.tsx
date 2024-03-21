import { PrismaClient } from '@prisma/client'
import { S3Client } from '@aws-sdk/client-s3'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

const credentials = {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY || "",
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY || ""
}

export const s3Client = new S3Client({ region: process.env.NEXT_PUBLIC_S3_REGION, credentials })