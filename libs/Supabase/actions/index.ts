"use server";
import { createClient } from "../server";

export async function readUserSession() {
    const supabase = createClient();
    return await supabase.auth.getUser();
}