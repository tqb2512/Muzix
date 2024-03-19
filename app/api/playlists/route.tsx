import { NextResponse } from "next/server";
import { prisma } from "@/app/api/base";

export async function GET(req: Request) {

    const limit = new URL(req.url).searchParams.get("limit") || "20";

    const playlists = await prisma.playlist.findMany({
        take: parseInt(limit),
    });
    return NextResponse.json({ playlists }, { status: 200 });
}