import {NextResponse} from "next/server";
import {prisma} from "@/app/api/base";

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

    return NextResponse.json({song}, {status: 200});
}