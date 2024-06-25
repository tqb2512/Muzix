import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/libs/Supabase/middleware'
import { readUserSession } from "@/libs/Supabase/actions";

export async function middleware(request: NextRequest) {

    const url = request.nextUrl.clone()
    const { data } = await readUserSession();

    if ((url.pathname.startsWith("/app") || url.pathname === "/account" ) && !data.user) {
        return NextResponse.redirect(url.origin + "/login")
    }

    if ((url.pathname === "/login" || url.pathname === "/signup") && data.user) {
        return NextResponse.redirect(url.origin + "/app")
    }

    return updateSession(request)
}


export const config = {
    api: {
        bodyParser: false,
    },
    matcher: [
        '/app/:path*',
        '/login',
        '/signup',
        '/account',
    ]
}