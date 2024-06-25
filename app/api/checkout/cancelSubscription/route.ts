import {stripe} from "@/libs/Stripe/stripe";
import {NextResponse} from "next/server";
import {prisma} from "@/app/api/base";

export async function POST(req: Request) {
    const {subscription_id, user_id} = await req.json();

    const subscription = await stripe.subscriptions.retrieve(subscription_id);

    await stripe.subscriptions.update(subscription_id, {
        cancel_at_period_end: true
    });

    await prisma.subscription.update({
        where: {
            subscription_id_user_id: {
                subscription_id: subscription_id,
                user_id: user_id
            }
        },
        data: {
            status: "canceled"
        }
    });

    return new NextResponse("Subscription canceled", {status: 200});
}