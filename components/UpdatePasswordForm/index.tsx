"use client";
import React from "react";
import {useSupabase} from "@/libs/Supabase/SupabaseProvider";
import {useRouter} from "next/navigation";

export default function UpdatePasswordForm() {

    const router = useRouter();
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    const {client} = useSupabase();

    const handleUpdatePassword = async () => {
        if (!password) {
            setError("Password cannot be empty");
            return;
        } else if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }
        client.auth.updateUser({password}).then((res) => {
            if (res.error) {
                setSuccess(null)
                setError(res.error.message);
            } else {
                setSuccess("Password updated successfully");
                setError(null);
                router.push("/login");
            }
        });
    }

    return (
        <div className="rounded-lg bg-dark-background w-[734px] h-4/5">
            <div className="flex h-full flex-col items-center p-10 justify-center">
                <div className="text-3xl font-bold text-white mb-10">
                    Update your password
                </div>
                <div className="flex flex-col space-y-4 w-1/2">
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="rounded-md p-3 bg-dark-background text-white border-2 border-gray-500"
                    />
                    {error && <div className="text-red-500 rounded-md p-3 bg-dark-background border-2 border-red-500">
                        {error}
                    </div>}
                    {success && <div className="text-green-500 rounded-md p-3 bg-dark-background border-2 border-green-500">
                        {success}
                    </div>}
                    <button
                        onClick={handleUpdatePassword}
                        className="rounded-md p-3 bg-green-500 font-bold text-dark-background transform transition-transform duration-200 hover:scale-105"
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    )
}