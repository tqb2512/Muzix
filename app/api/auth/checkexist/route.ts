import {prisma} from "@/app/api/base";
import {NextResponse} from "next/server";

export function GET (req: Request) {
    const email = new URL(req.url).searchParams.get("email") || ""
    const username = new URL(req.url).searchParams.get("username") || ""

    const emailExist = prisma.user.findFirst({
        where: {
            email: email
        }
    })

    const usernameExist = prisma.user.findFirst({
        where: {
            username: username
        }
    })

    return NextResponse.json({email: emailExist, username: usernameExist}, {status: 200})
}