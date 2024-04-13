import { NextResponse } from "next/server";
import { prisma } from "@/app/api/base";

export async function GET(req: Request) {

    const album_id = req.url.split("/").pop() || "";

    if (album_id === "") {
        return NextResponse.json({ error: "No album_id provided" }, { status: 400 });
    }

    const album = await prisma.album.findUnique({
        where: {
            album_id: album_id
        },
        include: {
            artist: true
        }
    });


    return NextResponse.json({ album }, { status: 200 });
}