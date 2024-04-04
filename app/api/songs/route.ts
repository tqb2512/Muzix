import { NextResponse } from "next/server";
import { prisma } from "@/app/api/base";

export async function GET(req: Request) {

    const limit = new URL(req.url).searchParams.get("limit") || "20";

    const songs = await prisma.song.findMany({
        take: parseInt(limit),
        include: {
            album: {
                include: {
                    artist: true
                }
            }
        }
    });
    return NextResponse.json({ songs }, { status: 200 });
}