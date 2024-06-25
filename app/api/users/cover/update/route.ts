import {NextResponse} from "next/server";
import {PutObjectCommand} from "@aws-sdk/client-s3";
import {s3Client} from "@/app/api/base";
import {readFileSync} from "fs";

export async function POST(req: Request) {
    const id = new URL(req.url).searchParams.get("id") || ""
    const {cover} = await req.json();

    if (cover === "") {
        s3Client.send(new PutObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET || "",
            Key: `Images/Users/${id}/cover.jpg`,
            Body: await readFileSync("public/next.svg"),
            ContentType: "image/jpeg"
        }));
        return NextResponse.json({message: "Success"}, {status: 200});
    }

    await s3Client.send(new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET || "",
        Key: `Images/Users/${id}/cover.jpg`,
        Body: Buffer.from(cover, "base64"),
        ContentType: "image/jpeg"
    }));

    return NextResponse.json({message: "Success"}, {status: 200});
}