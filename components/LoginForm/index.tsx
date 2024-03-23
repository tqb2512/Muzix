"use client";
import React from "react";
import { useSupabase } from "@/libs/SupabaseProvider";

export default function LoginForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { client } = useSupabase();

    const handleLogin = async () => {
        const { data, error } = await client.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error(error);
            return;
        }
    }

    const handleLogout = async () => {
        const { error } = await client.auth.signOut();

        if (error) {
            console.error(error);
            return;
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
                    <button
                        onClick={handleLogin}
                        className="rounded-md p-3 bg-green-500 text-white"
                    >
                        Login
                    </button>
                    <button onClick={handleLogout} className="rounded-md p-3 bg-green-500 text-white">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}