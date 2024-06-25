import {NextResponse} from "next/server";
import {prisma} from "@/app/api/base";

export async function GET(req: Request) {

    const limit = new URL(req.url).searchParams.get("limit") || "20";

    const sections = await prisma.section.findMany({
        take: parseInt(limit),
        include: {
            section_albums: {
                include: {
                    album: {
                        include: {
                            artist: true
                        }
                    }
                }
            },
            section_playlists: {
                include: {
                    playlist: true
                }
            },
            section_artists: {
                include: {
                    artist: true
                }
            }
        }
    });

    return NextResponse.json({sections}, {status: 200});
}