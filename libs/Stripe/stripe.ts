import Stripe from "stripe";

export const stripe = new Stripe(
    process.env.STRIPE_SECRECT_KEY as string, {
        apiVersion: "2023-10-16",
        typescript: true
    }
)