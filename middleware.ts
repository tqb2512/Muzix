import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { readUserSession } from "@/utils/supabase/actions";

export async function middleware(request: NextRequest) {

    const url = request.nextUrl.clone()
    const { data } = await readUserSession();

    if (url.pathname === "/app" && !data.user) {
        return NextResponse.redirect(url.origin + "/")
    }

    if ((url.pathname === "/login" || url.pathname === "/login") && data.user) {
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
    ]
}