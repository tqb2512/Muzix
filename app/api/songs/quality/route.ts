import {NextResponse} from "next/server";
import {ListObjectsV2Command} from "@aws-sdk/client-s3";
import {s3Client} from "@/app/api/base";


export async function GET(req: Request) {
    const id = new URL(req.url).searchParams.get("id") || ""

    if (id === "") {
        return NextResponse.json({error: "No id provided"}, {status: 400});
    }

    const data = await s3Client.send(new ListObjectsV2Command({
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET || "",
        Prefix: `Songs/${id}/`
    }));

    const quality = data.Contents?.map((song) => {
        return song.Key?.split("/").pop()?.split(".")[0];
    }).filter((song) => {
        return song !== undefined;
    });
    quality?.shift();

    return NextResponse.json({quality}, {status: 200});
}