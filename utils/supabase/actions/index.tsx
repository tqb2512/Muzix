"use server";
import { createClient } from "../server";

export async function readUserSession() {
    const supabase = createClient();
    const user = await supabase.auth.getSession();
    return user;
}