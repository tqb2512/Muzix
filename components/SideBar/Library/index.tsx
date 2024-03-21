"use client";
import * as Icons from "./Icons";
import { useState } from "react";

const categories = [
    "Playlists",
    "Artists",
    "Albums",
]

export function LibrarySection({ isExpanded = true }: { isExpanded?: boolean }) {

    const [selected, setSelected] = useState();

    return (
        <div className="rounded-lg bg-dark-background h-full">
            <div className="flex items-center justify-between ml-2">
                <div
                    className="font-bold flex items-center p-4 text-gray-button hover:text-white transition-all duration-300 ease-in-out">
                    <Icons.Library className="w-7 h-7 mr-4 fill-current flex-shrink-0" />
                    {isExpanded && "Library"}
                </div>
                {isExpanded &&
                    <div className="hover:bg-neutral-800 hover:text-white text-gray-button rounded-full w-8 h-8 flex items-center justify-center mx-4 transition-all duration-300 ease-in-out">
                        <Icons.Add className="w-4 h-4 fill-current flex-shrink-0" />
                    </div>
                }
            </div>

            {isExpanded &&
                <div className="flex flex-row space-x-2 ml-4">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="rounded-3xl text-sm text-white bg-gray-button-2 pr-3 pl-3 pt-2 pb-2 hover:bg-neutral-700 transition-all duration-300 ease-in-out hover: cursor-pointer">
                            {category}
                        </div>
                    ))}
                </div>
            }

            {isExpanded &&
                <div className="flex items-center justify-between mt-4">
                    <div className="hover:bg-neutral-800 hover:text-white text-gray-button rounded-full w-8 h-8 flex items-center justify-center mx-4 transition-all duration-300 ease-in-out">
                        <Icons.Search className="w-4 h-4 fill-current" />
                    </div>
                </div>
            }


        </div>
    )
}