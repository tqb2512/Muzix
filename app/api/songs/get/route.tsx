import { NextResponse } from "next/server";
import { StorageClient } from "@supabase/storage-js";

const STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_KEY = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || "";

const storage = new StorageClient(STORAGE_URL, {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
});

export async function GET(req: Request) {
    const id = new URL(req.url).searchParams.get("id") || ""
    const quality = new URL(req.url).searchParams.get("quality") || "medium"

    if (id === "") {
        return NextResponse.json({ error: "No id provided" }, { status: 400 });
    }
    
    const { data } = await storage.from("Songs").createSignedUrl(`/${id}/${quality}.mp3`, 600);

    return NextResponse.json({ url: data?.signedUrl }, { status: 200 });
}