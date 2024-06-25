import {PrismaClient} from "@prisma/client";
import {S3Client} from "@aws-sdk/client-s3";
import {createClient} from "@supabase/supabase-js";
import {Client} from "@elastic/elasticsearch";

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

const credentials = {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY || "",
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY || ""
}

export const s3Client = new S3Client({region: process.env.NEXT_PUBLIC_S3_REGION, credentials})

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "")

export const elastic = new Client({
    node: process.env.NEXT_PUBLIC_ELASTICSEARCH_ENDPOINT as string,
    auth: {
        apiKey: process.env.ELASTICSEARCH_API_KEY as string
    }
})