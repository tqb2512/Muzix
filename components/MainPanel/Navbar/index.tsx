"use client";
import { useRouter } from "next/navigation";
import * as Icons from "./Icons";

export default function Navbar() {

    const router = useRouter()

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
                        className="hover:bg-neutral-800 bg-black hover:text-white text-gray-button rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 ease-in-out">
                        <Icons.Back className="w-4 h-4 fill-current flex-shrink-0" />
                    </div>
                    <div
                        onClick={handleFoward}
                        className="hover:bg-neutral-800 bg-black hover:text-white text-gray-button rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 ease-in-out">
                        <Icons.Foward className="w-4 h-4 fill-current flex-shrink-0" />
                    </div>
                </div>

                <div className="flex space-x-2">
                    <div className="hover:bg-neutral-800 bg-black hover:text-white text-gray-button rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 ease-in-out">

                    </div>
                </div>
            </div>
        </div>
    )
}