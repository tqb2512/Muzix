"use client";
import React from "react";
import {useSupabase} from "@/libs/Supabase/SupabaseProvider";
import Link from "next/link";

export default function SignupForm() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [username, setUsermame] = React.useState("");
    const [gender, setGender] = React.useState<string>("Male");
    const [birthday, setBirthday] = React.useState<Date>(new Date());
    const [success, setSuccess] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const {client} = useSupabase();

    const handleSignup = async () => {
        const birthdayDate = `${birthday.getFullYear()}-${String(birthday.getMonth() + 1).padStart(2, '0')}-${String(birthday.getDate()).padStart(2, '0')}`;

        await fetch(`/api/auth/checkexist?email=${email}&username=${username}`)
            .then(response => response.json())
            .then(async data => {
                if (data.email != 0) {
                    setError("Email already exists");
                    return;
                } else if (data.username != 0) {
                    setError("Username already exists");
                    return;
                } else {
                    const {error: error, data: user} = await client.auth.signUp({
                        email,
                        password,
                        options: {
                            data: {
                                email,
                                username,
                                gender,
                                birthday: birthdayDate
                            }
                        }
                    });

                    if (error) {
                        setSuccess(null)
                        setError(error.message);
                    } else {
                        fetch(`/api/users/cover/update?id=${user.user?.id}`, {
                            method: "POST",
                            body: JSON.stringify({cover: ""})
                        });
                        setSuccess("Email sent. Please check your inbox.");
                        setError(null);
                    }
                }
            })
    }


    return (
        <div className="rounded-lg bg-dark-background w-[734px] h-4/5">
            <div className="flex h-full flex-col items-center p-10 justify-center">
                <div className="text-3xl font-bold text-white mb-10">
                    Sign up to start listening
                </div>
                <div className="flex flex-col space-y-4 w-1/2">
                    <input
                        onChange={(e) => setUsermame(e.target.value)}
                        type="text"
                        placeholder="Username"
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
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="rounded-md p-3 bg-dark-background text-white border-2 border-gray-500"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <input
                        onChange={(e) => setBirthday(new Date(e.target.value))}
                        type="date"
                        className="rounded-md p-3 bg-dark-background text-white border-2 border-gray-500"
                    />
                    {error && <div className="text-red-500 rounded-md p-3 bg-dark-background border-2 border-red-500">
                        {error}
                    </div>}
                    {success && <div className="text-green-500 rounded-md p-3 bg-dark-background border-2 border-green-500">
                        {success}
                    </div>}
                    <button
                        onClick={handleSignup}
                        className="rounded-md p-3 bg-green-500 font-bold text-dark-background transform transition-transform duration-200 hover:scale-105"
                    >
                        Sign up
                    </button>
                    <hr className="border-gray-500"/>
                    <div className="text-gray-text text-center">
                        Already have an account? <Link href="/login" className="hover:text-green-500 text-white underline">Log
                        in here</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}