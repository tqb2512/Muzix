import { NextResponse } from "next/server";
import { prisma } from "@/app/api/base";
import { stripe } from "@/libs/Stripe/stripe";


export async function GET(req: Request) {
    
        const user_id = req.url.split("/")[5] || "";

        if (user_id === "") {
            return NextResponse.json({ error: "No user_id provided" }, { status: 400 });
        }
    
        const subscription = await prisma.subscription.findFirst({
            where: {
                user_id: user_id
            },
        });


        return NextResponse.json({ subscription }, { status: 200 });
    }