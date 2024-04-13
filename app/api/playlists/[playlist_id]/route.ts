import { NextResponse } from "next/server";
import { prisma } from "@/app/api/base";

export async function GET(req: Request) {

    const playlist_id = req.url.split("/").pop() || "";

    if (playlist_id === "") {
        return NextResponse.json({ error: "No playlist_id provided" }, { status: 400 });
    }

    const playlist = await prisma.playlist.findUnique({
        where: {
            playlist_id: playlist_id
        },
        include: {
            user: true
        }
    });

    return NextResponse.json({ playlist }, { status: 200 });
}