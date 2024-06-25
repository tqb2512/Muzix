import {NextResponse} from "next/server";
import {prisma} from "@/app/api/base";

export async function GET(req: Request) {

    const artist_id = req.url.split("/").pop() || "";

    if (artist_id === "") {
        return NextResponse.json({error: "No artist_id provided"}, {status: 400});
    }

    const artist = await prisma.artist.findUnique({
        where: {
            artist_id: artist_id
        },
        include: {
            album: true
        }
    });

    return NextResponse.json({artist}, {status: 200});
}