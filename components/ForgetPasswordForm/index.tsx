"use client";
import React from "react";
import { useSupabase } from "@/libs/Supabase/SupabaseProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgetPasswordForm() {

    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const { client } = useSupabase();

    const handleForgetPassword = async () => {
        const { error } = await client.auth.resetPasswordForEmail(email, {
            redirectTo: "http://localhost:3000/update-password",
        });

        if (error) {
            setError(error.message);
        } else {
            setError(null);
        }
    }

    return (
        <div className="rounded-lg bg-dark-background w-[734px] h-4/5">
            <div className="flex h-full flex-col items-center p-10 justify-center">
                <div className="text-3xl font-bold text-white mb-10">
                    Reset your password
                </div>
                <div className="flex flex-col space-y-4 w-1/2">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                        className="rounded-md p-3 bg-dark-background text-white border-2 border-gray-500"
                    />
                    {error && <div className="text-red-500 rounded-md p-3 bg-dark-background border-2 border-red-500">
                        {error}
                    </div>}
                    <button
                        onClick={handleForgetPassword}
                        className="rounded-md p-3 bg-green-500 font-bold text-dark-background transform transition-transform duration-200 hover:scale-105"
                    >
                        Send Link
                    </button>
                </div>
            </div>
        </div>
    )
}