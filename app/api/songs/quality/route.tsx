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

    if (id === "") {
        return NextResponse.json({ error: "No id provided" }, { status: 400 });
    }
    
    const { data, error } = await storage.from("Songs").list(id);

    const quality = data?.map((item: any) => item.name.split(".")[0]);
    
    return NextResponse.json({ quality }, { status: 200 });
}