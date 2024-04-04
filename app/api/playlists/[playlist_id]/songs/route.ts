import { NextResponse } from "next/server";
import { prisma } from "@/app/api/base";

export async function GET(req: Request) {

    const playlist_id = req.url.split("/")[5] || "";

    if (playlist_id === "") {
        return NextResponse.json({ error: "No playlist_id provided" }, { status: 400 });
    }

    const songs = await prisma.song.findMany({
        where: {
            playlist_song: {
                some: {
                    playlist_id: playlist_id
                }
            }
        },
        include: {
            playlist_song: true,
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
        },
    });

    return NextResponse.json({ songs }, { status: 200 });
}