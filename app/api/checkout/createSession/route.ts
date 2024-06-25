import {stripe} from "@/libs/Stripe/stripe";
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    const {customer_id} = await req.json();
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        customer: customer_id,
        line_items: [
            {
                price: "price_1P1Pr7RwGVdG4yNrxL9IapGi",
                quantity: 1,
            }
        ],
        success_url: `${req.headers.get("origin")}/account`,
        cancel_url: `${req.headers.get("origin")}/`,
    })

    return new NextResponse(JSON.stringify({id: session.id}), {status: 200});
}