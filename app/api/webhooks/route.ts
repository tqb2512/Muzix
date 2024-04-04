import {stripe} from "@/libs/Stripe/stripe";
import {prisma} from "@/app/api/base";
import {headers} from 'next/headers';
import Stripe from "stripe";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
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

                let user = await prisma.user.findFirst({
                    where: {
                        stripe_user_id: session.customer as string
                    }
                });

                if (user) {
                    await prisma.subscription.create({
                        data: {
                            subscription_id: subscription.id,
                            user_id: user.user_id,
                            status: subscription.status,
                            cancel_at: new Date((subscription.cancel_at || 0) * 1000),
                            canceled_at: new Date((subscription.canceled_at || 0) * 1000),
                            current_period_end: new Date(subscription.current_period_end * 1000),
                            current_period_start: new Date(subscription.current_period_start * 1000),
                            ended_at: new Date((subscription.ended_at || 0) * 1000),
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