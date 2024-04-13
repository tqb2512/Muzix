import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { stripe } from "@/libs/Stripe/stripe";
import { prisma } from "@/app/api/base";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = createRouteHandlerClient({ cookies })
    const { data } = await supabase.auth.getUser()
    const user = await prisma.user.findFirst({ where: { user_id: data?.user?.id as string } })

    if (user?.stripe_user_id) {
        return new NextResponse(JSON.stringify({ id: user.stripe_user_id }), { status: 200 });
    }
    const customer = await stripe.customers.create({
        name: data?.user?.user_metadata['name'] as string,
        email: data?.user?.email as string
    })

    await prisma.user.update({
        where: { user_id: data?.user?.id as string },
        data: {
            stripe_user_id: customer.id
        }
    })

    return new NextResponse(JSON.stringify({ id: customer.id }), { status: 200 });
}
