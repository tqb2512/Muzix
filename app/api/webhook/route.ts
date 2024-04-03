import {stripe} from "@/libs/Stripe/stripe";
import {prisma} from "@/app/api/base";
import {headers} from 'next/headers';
import Stripe from "stripe";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    console.log("Webhook received");
    const body = await req.text();
    const sig = headers().get("Stripe-Signature") as string;

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        return new NextResponse(err.message, {status: 400});
    }
    const session = event.data.object as Stripe.Checkout.Session;
    switch (event.type) {
        case "checkout.session.completed":
            if (session.mode === "subscription") {
                const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

                const user = await prisma.subscription.findFirst({
                    where: {
                        stripe_user_id: subscription.customer as string
                    }
                });

                if (user) {
                    await prisma.subscription.update({
                        where: {
                            id_user_id_stripe_user_id: {
                                id: user.id,
                                user_id: user.user_id,
                                stripe_user_id: user.stripe_user_id,
                            }
                        },
                        data: {
                            status: subscription.status as string,
                            cancel_at: subscription.cancel_at?.toString(),
                            current_period_end: subscription.current_period_end?.toString(),
                            current_period_start: subscription.current_period_start?.toString(),
                            ended_at: subscription.ended_at?.toString(),
                        }
                    });
                }
                break;
            }
        default:
            return new NextResponse("Does not handle this event", {status: 500});
    }

    return new NextResponse("Webhook received", {status: 200});
}