"use client";
import React from "react";
import { useSupabase } from "@/libs/Supabase/SupabaseProvider";
import { useRouter } from "next/navigation";

export default function LoginForm() {

    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const { client } = useSupabase();

    const handleLogin = async () => {
        const { error } = await client.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            return;
        } else {
            setError(null);
            router.push("/app");
        }
    }

    return (
        <div className="rounded-lg bg-dark-background w-[734px] h-4/5">
            <div className="flex flex-col items-center p-10">
                <div className="text-3xl font-bold text-white mb-10">
                    Login
                </div>
                <div className="flex flex-col space-y-4 w-full">
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
                    {error && <div className="text-red-500 rounded-md p-3 bg-dark-background border-2 border-red-500">
                        {error}
                    </div>}
                    <button
                        onClick={handleLogin}
                        className="rounded-md p-3 bg-green-500 text-white"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}