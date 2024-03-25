import { NextResponse } from "next/server";
import { prisma } from "@/app/api/base";

export async function GET(req: Request) {

    const album_id = req.url.split("/")[5] || "";

    if (album_id === "") {
        return NextResponse.json({ error: "No album_id provided" }, { status: 400 });
    }
    
    const songs = await prisma.song.findMany({
        where: {
            album_id: album_id
        },
        include: {
            album: {
                include: {
                    artist: true
                }
            },
            artist_contribute_song: {
                include: {
                    artist: true
                }
            }
        }
    });

    return NextResponse.json({ songs }, { status: 200 });
}