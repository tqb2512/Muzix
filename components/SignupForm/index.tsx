"use client";
import React from "react";
import { useSupabase } from "@/libs/Supabase/SupabaseProvider";

export default function SignupForm() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");

    const { client } = useSupabase();

    const handleSignup = async () => {
        const { error } = await client.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name
                }
            }
        });

        if (error) {
            console.error(error);
            return;
        }
    }


    return (
        <div className="rounded-lg bg-dark-background w-[734px] h-4/5">
            <div className="flex flex-col items-center p-10">
                <div className="text-3xl font-bold text-white mb-10">
                    Signup
                </div>
                <div className="flex flex-col space-y-4 w-full">
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                        className="rounded-md p-3 bg-dark-background text-white border-2 border-gray-500"
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                        className="rounded-md p-3 bg-dark-background text-white border-2 border-gray-500"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="rounded-md p-3 bg-dark-background text-white border-2 border-gray-500"
                    />
                    <button
                        onClick={handleSignup}
                        className="rounded-md p-3 bg-green-500 text-white"
                    >
                        Signup
                    </button>
                </div>
            </div>
        </div>
    )
}