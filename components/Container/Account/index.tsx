"use client";
import {readUserSession} from "@/libs/Supabase/actions";
import {useEffect, useState} from "react";
import * as usersAPI from "@/libs/Redux/features/apiSlices/users";
import {skipToken} from "@reduxjs/toolkit/query";
import {stripeClient} from "@/libs/Stripe/stripeClient";
import {useSelector} from "react-redux";
import {useSupabase} from "@/libs/Supabase/SupabaseProvider";
import Link from "next/link";
import Image from "next/image";
import {createClient} from "@/libs/Supabase/client";
import {useRouter} from "next/navigation";

export default function AccountContainer() {

    const router = useRouter();
    const supabase = useSupabase();
    const user = useSelector((state: any) => state.user);
    const [userClone, setUserClone] = useState(user);
    const [password, setPassword] = useState<string>("");
    const [userId, setUserId] = useState<string | null>(null);
    const {data: subscription} = usersAPI.useGetSubscriptionQuery(user?.user_id || skipToken);
    const {data: profileUrl} = usersAPI.useGetCoverByIdQuery(user?.user_id || skipToken);

    useEffect(() => {
        console.log(subscription);
    }, [subscription]);

    const handleSubscribe = async () => {
        const stripe = await stripeClient;
        if (!stripe) {
            console.error('Stripe client is not loaded');
            return;
        }
        await fetch("api/checkout/getCustomer").then((res) => res.json()).then((data) => {
            fetch("api/checkout/createSession", {
                method: "POST",
                body: JSON.stringify({
                    customer_id: data.id
                })
            }).then((res) => res.json()).then((data) => {
                stripe.redirectToCheckout({sessionId: data.id});
            })
        })
    }

    const handleCancel = async () => {
        const stripe = await stripeClient;
        if (!stripe) {
            console.error('Stripe client is not loaded');
            return;
        }
        await fetch("api/checkout/getCustomer").then((res) => res.json()).then((data) => {
            fetch("api/checkout/cancelSubscription", {
                method: "POST",
                body: JSON.stringify({
                    subscription_id: subscription?.result?.subscription_id,
                    user_id: userId
                })
            })
        })
    }

    const handleSave = async () => {
        if (userClone?.email != user?.email) {
            await supabase.client.auth.updateUser({email: userClone?.email});
            alert("Email updated, please verify your email")
        }
        if (password !== "") {
            await supabase.client.auth.updateUser({password});
        }
        await fetch("api/users/update", {
            method: "POST",
            body: JSON.stringify({
                user: userClone,
            })
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            alert("Profile updated")
        })
    }

    return (
        <div>
            <div className="w-full h-20 flex items-center">
                <div className="w-[75%] h-full flex justify-between items-center mx-auto">
                    <Link href="/app" className="text-3xl">Muzix</Link>
                    <div
                        onClick={() => {
                            document.getElementById("dropdown")?.classList.toggle("hidden");
                        }}
                        className="size-10 overflow-hidden relative rounded-full">
                        <Image
                            src={profileUrl?.url || "/next.svg"}
                            alt="Profile cover"
                            fill
                            sizes="40px"
                            className="object-cover"/>
                    </div>
                    <div
                        id="dropdown"
                        className="z-50 bg-neutral-800 rounded-md w-48 h-max right-6 top-16 absolute p-1 hidden">
                        <div className="flex flex-col justify-between w-full">
                            <Link href={`/app/user/${user.user_id}`}
                                  className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
                                Profile
                            </Link>
                            <hr className="border-neutral-700"/>
                            <button
                                onClick={() => {
                                    createClient().auth.signOut().then(() => {
                                        router.push("/login");
                                    })
                                }}
                                className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
                                <h1>Log out</h1>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[50%] mt-10 mx-auto flex flex-col space-y-4">
                <div
                    onClick={subscription?.result?.status === "active" ? handleCancel : handleSubscribe}
                    className="w-full h-[200px] bg-dark-background rounded-lg p-4 hover:bg-hover-gray-background">
                    <h1>Your subscription</h1>
                    {subscription?.result?.status === "active" ? (
                        <div className="flex flex-col justify-between h-full pb-4">
                            <h1 className="text-4xl text-green-400 font-semibold">Muzix Premium</h1>
                            {subscription?.result?.cancel_at?.toLocaleString().search("1970") ? (
                                <h1>Canceling on {subscription?.result?.cancel_at?.toLocaleString()}</h1>
                            ) : (
                                <h1>Next payment
                                    on {new Date(subscription?.result?.current_period_end?.toLocaleString() || "").toLocaleDateString()}</h1>
                            )}
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-4xl text-green-400 font-semibold">Muzix Free</h1>
                        </div>
                    )}
                </div>
                <div className="w-full h-full bg-dark-background rounded-lg p-4">
                    <h1>Your profile</h1>
                    <div className="flex flex-col space-y-2 mt-4">
                        <input
                            disabled={true}
                            className="rounded-md p-3 bg-dark-background text-white border-2 border-gray-500"
                            type="text" placeholder="Username" value={userClone?.username}
                            onChange={(e) => setUserClone({...userClone, username: e.target.value})}
                        />
                        <input
                            className="rounded-md p-3 bg-dark-background text-white border-2 border-gray-500"
                            type="email" placeholder="Email" value={userClone?.email ? userClone.email : ""}
                            onChange={(e) => setUserClone({...userClone, email: e.target.value})}
                        />
                        <input
                            className="rounded-md p-3 bg-dark-background text-white border-2 border-gray-500"
                            type="password" placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <select
                            className="rounded-md p-3 bg-dark-background text-white border-2 border-gray-500"
                            value={userClone?.gender}
                            onChange={(e) => setUserClone({...userClone, gender: e.target.value})}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <input
                            className="rounded-md p-3 bg-dark-background text-white border-2 border-gray-500"
                            type="date" placeholder="Birthday"
                            value={userClone?.birthday ? new Date(userClone.birthday).toISOString().split('T')[0] : ""}
                            onChange={(e) => setUserClone({
                                ...userClone,
                                birthday: new Date(e.target.value).toISOString()
                            })}
                        />
                        <button
                            onClick={handleSave}
                            className="bg-green-400 text-white rounded-lg p-2">Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}