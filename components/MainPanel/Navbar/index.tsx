"use client";
import {useRouter} from "next/navigation";
import * as Icons from "./Icons";
import * as usersAPI from "@/libs/Redux/features/apiSlices/users";
import {readUserSession} from "@/libs/Supabase/actions";
import Image from "next/image";
import {useContext, useEffect, useState} from "react";
import {skipToken} from "@reduxjs/toolkit/query";
import {createClient} from "@/libs/Supabase/client";
import Link from "next/link";
import {ColorContext} from "@/components/MainPanel/ColorContext";

export default function Navbar() {

    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const {data: cover} = usersAPI.useGetCoverByIdQuery(userId || skipToken);
    const { color } = useContext(ColorContext);

    useEffect(() => {
        const fetchProfile = async () => {
            const {data} = await readUserSession();
            setUserId(data?.user?.id || null);
        }
        fetchProfile();
    }, []);

    const handleBack = () => {
        router.back();
    }

    const handleForward = () => {
        router.forward();
    }

    return (
        <div className="z-50 h-16 sticky top-0 bg-dark-background rounded-t-lg"
             style={{backgroundColor: color}}>
            <div className="flex pl-6 p-4 pr-6 items-center justify-between">
                <div className="flex space-x-2">
                    <div
                        onClick={handleBack}
                        className="hover:bg-neutral-800 bg-black hover:text-white text-gray-button rounded-full w-9 h-9 flex items-center justify-center transition-all duration-300 ease-in-out">
                        <Icons.Back className="w-4 h-4 fill-current flex-shrink-0"/>
                    </div>
                    <div
                        onClick={handleForward}
                        className="hover:bg-neutral-800 bg-black hover:text-white text-gray-button rounded-full w-9 h-9 flex items-center justify-center transition-all duration-300 ease-in-out">
                        <Icons.Foward className="w-4 h-4 fill-current flex-shrink-0"/>
                    </div>
                </div>

                <div className="flex space-x-2">
                    <div
                        onClick={() => {
                            document.getElementById("dropdown")?.classList.toggle("hidden");
                        }}
                        className="hover:bg-neutral-800 bg-black hover:text-white text-gray-button overflow-hidden rounded-full relative w-9 h-9 flex items-center justify-center transition-all duration-300 ease-in-out">
                        <div className="h-7 w-7 overflow-hidden relative rounded-full">
                            <Image
                                src={cover?.url || "/next.svg"}
                                alt="Profile cover"
                                fill
                                sizes="32px"
                                className="object-cover"/>
                        </div>
                    </div>
                    <div
                        id="dropdown"
                        className="z-50 bg-neutral-800 rounded-md w-48 h-max right-6 top-14 absolute p-1 hidden">
                        <div className="flex flex-col justify-between w-full">
                            <button className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
                                <h1>Account</h1>
                            </button>
                            <Link href={`/app/user/${userId}`} className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
                                Profile
                            </Link>
                            <hr className="border-neutral-700"/>
                            <button
                                onClick={() => { createClient().auth.signOut().then(() => {router.push("/login");})}}
                                className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
                                <h1>Log out</h1>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}