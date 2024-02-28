import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {

    const limit = new URL(req.url).searchParams.get("limit") || "10";

    const songs = await prisma.song.findMany({
        take: parseInt(limit),
        // select: {
        //     song_id: true,
        //     name: true,
        //     duration_ms: true,
        //     album: {
        //         select: {
        //             name: true,
        //             artist: {
        //                 select: {
        //                     name: true
        //                 }
        //             }
        //         }
        //     },
        // }
        include: {
            album: {
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

    return NextResponse.json({ songs }, { status: 200 });
}