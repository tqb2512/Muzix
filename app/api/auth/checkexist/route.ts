import {prisma} from "@/app/api/base";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const email = new URL(req.url).searchParams.get("email") || ""
    const username = new URL(req.url).searchParams.get("username") || ""

    const emailExist = await prisma.user.findMany({
        where: {
            email
        }
    })

    const usernameExist = await prisma.user.findMany({
        where: {
            username
        }
    })

    return NextResponse.json({email: emailExist.length, username: usernameExist.length}, {status: 200})
}