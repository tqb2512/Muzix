import { NextResponse } from "next/server";
import { prisma, s3Client } from "@/app/api/base";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function GET(req: Request) {

    const playlist_id = req.url.split("/").pop() || "";

    if (playlist_id === "") {
        return NextResponse.json({ error: "No playlist_id provided" }, { status: 400 });
    }

    const playlist = await prisma.playlist.findUnique({
        where: {
            playlist_id: playlist_id
        },
        include: {
            user: true
        }
    });

    return NextResponse.json({ playlist }, { status: 200 });
}

export async function POST(req: Request) {

    const { name, description, cover } = await req.json();
    const playlist_id = req.url.split("/").pop() || "";

    if (playlist_id === "") {
        return NextResponse.json({ error: "No playlist_id provided" }, { status: 400 });
    }

    const playlist = await prisma.playlist.update({
        where: {
            playlist_id: playlist_id
        },
        data: {
            name: name,
            description: description,
        }
    });

    if (cover === "") {
        return NextResponse.json({ message: "Success" }, { status: 200 });
    }
    
    s3Client.send(new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET || "",
        Key: `Images/Playlists/${playlist.playlist_id}/cover.jpg`,
        Body: Buffer.from(cover, "base64"),
        ContentType: "image/jpeg"
    }));

    return NextResponse.json({ message: "Success" }, { status: 200 });
}