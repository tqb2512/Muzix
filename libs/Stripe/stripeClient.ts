import {loadStripe, Stripe} from "@stripe/stripe-js";

export const stripeClient = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
) as Promise<Stripe | null>;