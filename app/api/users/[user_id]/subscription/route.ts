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
            }
        });

        const updatedSubscription = await stripe.subscriptions.retrieve(subscription?.subscription_id || "");
        const result = await prisma.subscription.update({
            where: {
                subscription_id_user_id: {
                    subscription_id: updatedSubscription.id,
                    user_id: user_id
                }
            },
            data: {
                status: updatedSubscription.status,
                cancel_at: new Date((updatedSubscription.cancel_at || 0) * 1000),
                canceled_at: new Date((updatedSubscription.canceled_at || 0) * 1000),
                current_period_end: new Date(updatedSubscription.current_period_end * 1000),
                current_period_start: new Date(updatedSubscription.current_period_start * 1000),
                ended_at: new Date((updatedSubscription.ended_at || 0) * 1000),
            }
        });

        return NextResponse.json({ result }, { status: 200 });
}