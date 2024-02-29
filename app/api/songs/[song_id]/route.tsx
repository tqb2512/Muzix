import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {

    const song_id = req.url.split("/").pop() || "";

    const song = await prisma.song.findUnique({
        where: {
            song_id: song_id
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

    // const result = songs.map((song) => {
    //     return {
    //         id: song.song_id,
    //         name: song.name,
    //         duration: song.duration_ms,
    //         album: song.album.name,
    //         artist: song.album.artist.name
    //     }
    // });

    return NextResponse.json({ song }, { status: 200 });
}