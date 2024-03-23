"use client";
import { useRouter } from "next/navigation";
import * as Icons from "./Icons";
import * as usersAPI from "@/libs/features/apiSlices/users";
import { readUserSession } from "@/utils/supabase/actions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

export default function Navbar() {

    const router = useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const { data: cover } = usersAPI.useGetCoverbyIdQuery(userId || skipToken);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data } = await readUserSession();
            setUserId(data.session?.user.id || null);
        }
        fetchProfile();
    }, []);

    const handleBack = () => {
        router.back();
    }

    const handleFoward = () => {
        router.forward();
    }

    return (
        <div className="h-16 sticky top-0 bg-dark-background rounded-t-lg">
            <div className="flex pl-6 p-4 pr-6 items-center justify-between">
                <div className="flex space-x-2">
                    <div
                        onClick={handleBack}
                        className="hover:bg-neutral-800 bg-black hover:text-white text-gray-button rounded-full w-9 h-9 flex items-center justify-center transition-all duration-300 ease-in-out">
                        <Icons.Back className="w-4 h-4 fill-current flex-shrink-0" />
                    </div>
                    <div
                        onClick={handleFoward}
                        className="hover:bg-neutral-800 bg-black hover:text-white text-gray-button rounded-full w-9 h-9 flex items-center justify-center transition-all duration-300 ease-in-out">
                        <Icons.Foward className="w-4 h-4 fill-current flex-shrink-0" />
                    </div>
                </div>

                <div className="flex space-x-2">
                    <div className="hover:bg-neutral-800 bg-black hover:text-white text-gray-button overflow-hidden rounded-full relative w-9 h-9 flex items-center justify-center transition-all duration-300 ease-in-out">
                    <div className="h-7 w-7 overflow-hidden relative rounded-full">
                        <Image 
                            src={cover?.url || "/next.svg"} 
                            alt="Profile cover"
                            fill
                            sizes="32px"
                            className="object-cover" />
                    </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}