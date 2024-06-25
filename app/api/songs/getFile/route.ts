import {NextResponse} from "next/server";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {GetObjectCommand} from "@aws-sdk/client-s3";
import {s3Client} from "@/app/api/base";

export async function GET(req: Request) {
    const id = new URL(req.url).searchParams.get("id") || ""
    const quality = new URL(req.url).searchParams.get("quality") || "medium"

    if (id === "") {
        return NextResponse.json({error: "No id provided"}, {status: 400});
    }

    const url = await getSignedUrl(s3Client, new GetObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET || "",
        Key: `Songs/${id}/${quality}.mp3`
    }));

    return NextResponse.json({url}, {status: 200});
}