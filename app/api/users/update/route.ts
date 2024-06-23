import {NextResponse} from "next/server";
import {prisma} from "@/app/api/base";

export async function POST(req: Request) {
    const { user } = await req.json();

    const updatedUser = await prisma.user.update({
        where: {
            user_id: user.user_id
        },
        data: {
            gender: user.gender,
            birthday: user.birthdate,
        }
    });

    return NextResponse.json({ updatedUser }, { status: 200 });
}
