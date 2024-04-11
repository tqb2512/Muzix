"use client";
import * as Icons from "./Icons";
import {useEffect, useState} from "react";
import * as usersAPI from "@/libs/Redux/features/apiSlices/users";
import {skipToken} from "@reduxjs/toolkit/query";
import {readUserSession} from "@/libs/Supabase/actions";
import ArtistBox from "@/components/SideBar/Library/Artist";
import AlbumBox from "@/components/SideBar/Library/Album";
import PlaylistBox from "@/components/SideBar/Library/Playlist";

export function LibrarySection({isExpanded = true}: { isExpanded?: boolean }) {

    const [userId, setUserId] = useState<string>("");
    const {data} = usersAPI.useGetUserByIdQuery(userId || skipToken);
    const [visualData, setVisualData] = useState<any[]>([]);

    useEffect(() => {
        readUserSession().then((session) => {
            setUserId(session?.data.user?.id || "");
        })
    }, [])

    useEffect(() => {
        const combinedData = [
            ...(data?.user.playlist || []),
            ...(data?.user.user_following_artist || []),
            ...(data?.user.user_like_album || []),
        ]
        setVisualData(combinedData);
    }, [data])

    const renderItem = (item: any, index: number) => {
        if (item.album) {
            return (
                <div key={index}>
                    <AlbumBox album={item.album} isExpanded={isExpanded}/>
                </div>
            )
        } else if (item.artist) {
            return (
                <div key={index}>
                    <ArtistBox artist={item.artist} isExpanded={isExpanded}/>
                </div>
            )
        } else if (item.playlist) {
            return (
                <div key={index}>
                    <PlaylistBox playlist={item.playlist} isExpanded={isExpanded}/>
                </div>
            )
        }
    }

    return (
        <div className="rounded-lg bg-dark-background h-full overflow-y-hidden">
            <div className="flex items-center justify-between ml-2">
                <div
                    className="font-bold flex items-center p-4 text-gray-button hover:text-white transition-all duration-300 ease-in-out">
                    <Icons.Library className="w-7 h-7 mr-4 fill-current flex-shrink-0"/>
                    {isExpanded && "Library"}
                </div>
                {isExpanded &&
                    <div
                        className="hover:bg-neutral-800 hover:text-white text-gray-button rounded-full w-8 h-8 flex items-center justify-center mx-4 transition-all duration-300 ease-in-out">
                        <Icons.Add className="w-4 h-4 fill-current flex-shrink-0"/>
                    </div>
                }
            </div>

            <div className="flex px-2 flex-col space-y-2 h-full overflow-y-auto">
                {visualData.map((item, index) => (
                    renderItem(item, index)
                ))}
            </div>

        </div>
    )
}