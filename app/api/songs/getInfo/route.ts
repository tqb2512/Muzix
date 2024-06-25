import {NextResponse} from "next/server";
import {prisma} from "@/app/api/base";
import {song} from "@prisma/client";

export async function GET(req: Request) {

    const id = new URL(req.url).searchParams.get("id") || "";

    let songs: song[] = [];

    if (id !== "") {
        songs = await prisma.song.findMany({
            where: {
                song_id: {
                    in: id.split(",")
                }
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
    }

    return NextResponse.json({songs}, {status: 200});
}