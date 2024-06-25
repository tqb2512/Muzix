import {NextResponse} from "next/server";
import {prisma} from "@/app/api/base";

export async function GET(req: Request) {
    const section_id = req.url.split("/").pop() || "";

    if (section_id === "") {
        return NextResponse.json({error: "No section_id provided"}, {status: 400});
    }

    const section = await prisma.section.findMany({
        where: {
            section_id: section_id
        },
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

    return NextResponse.json({section: section[0]}, {status: 200});
}