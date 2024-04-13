"use client";
import { readUserSession } from "@/libs/Supabase/actions";
import { useEffect, useState } from "react";
// import {stripeClient} from "@/libs/Stripe/stripeClient";

export default function AccountContainer() {

    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data } = await readUserSession();
            setUserId(data?.user?.id || null);
        }
        fetchProfile();
    }, []);

    // const handleSubscribe = async () => {
    //     const stripe = await stripeClient;
    //     if (!stripe) {
    //         console.error('Stripe client is not loaded');
    //         return;
    //     }
    //     await fetch("api/checkout/getCustomer").then((res) => res.json()).then((data) => {
    //         fetch("api/checkout/createSession", {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 customer_id: data.id
    //             })
    //         }).then((res) => res.json()).then((data) => {
    //             stripe.redirectToCheckout({sessionId: data.id});
    //         })
    //     })
    // }

    return (
        <div>
            <div className="w-full h-20 flex items-center">
                <div className="w-[75%] h-full flex justify-between items-center mx-auto">
                    <h1 className="text-3xl">{userId}</h1>
                    <div className="bg-dark-background rounded-full size-10">
                    </div>
                </div>
            </div>

            <div className="max-w-[50%] mt-16 mx-auto flex flex-col space-y-4">
                <div className="w-full h-[200px] bg-dark-background rounded-lg">

                </div>
                <div className="w-full h-[200px] bg-dark-background rounded-lg">

                </div>
                <div className="w-full h-[200px] bg-dark-background rounded-lg">

                </div>

            </div>
        </div>
    )
}