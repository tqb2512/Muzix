"use client";
import ArtistBox from "@/components/SideBar/Library/Artist";
import AlbumBox from "@/components/SideBar/Library/Album";
import PlaylistBox from "@/components/SideBar/Library/Playlist";
import * as Icons from "./Icons";
import * as usersAPI from "@/libs/Redux/features/apiSlices/users";
import * as userSlice from "@/libs/Redux/features/slices/user";
import { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/libs/Redux/store";
import { readUserSession } from "@/libs/Supabase/actions";


export function LibrarySection({ isExpanded = true }: { isExpanded?: boolean }) {
    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user);
    const [userId, setUserId] = useState<string>("");
    const [visualData, setVisualData] = useState<any[]>([]);
    const { data } = usersAPI.useGetUserByIdQuery(userId || skipToken);


    useEffect(() => {
        readUserSession().then((session) => {
            setUserId(session?.data.user?.id || "");
        })
    }, [])

    useEffect(() => {
        dispatch(userSlice.setUser(data?.user || {} as any));
    }, [data, dispatch])

    useEffect(() => {
        const combinedData = [
            ...(user?.playlist || []),
            ...(user?.user_following_playlist || []),
            ...(user?.user_following_artist || []),
            ...(user?.user_like_album || []),
        ]
        combinedData.sort((a: any, b: any) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        })
        setVisualData(combinedData);
    }, [user])

    const renderItem = (item: any, index: number) => {
        if (item.album) {
            return (
                <div key={index}>
                    <AlbumBox album={item.album} isExpanded={isExpanded} />
                </div>
            )
        } else if (item.artist) {
            return (
                <div key={index}>
                    <ArtistBox artist={item.artist} isExpanded={isExpanded} />
                </div>
            )
        } else if (item.playlist) {
            return (
                <div key={index}>
                    <PlaylistBox playlist={item.playlist} isExpanded={isExpanded} />
                </div>
            )
        }
    }

    return (
        <div className="rounded-lg bg-dark-background h-full overflow-y-hidden">
            <div className="flex items-center justify-between ml-2">
                <div
                    className="font-bold flex items-center p-4 text-gray-button hover:text-white transition-all duration-300 ease-in-out">
                    <Icons.Library className="w-7 h-7 mr-4 fill-current flex-shrink-0" />
                    {isExpanded && "Library"}
                </div>
                {isExpanded &&
                    <div
                        className="hover:bg-neutral-800 hover:text-white text-gray-button rounded-full w-8 h-8 flex items-center justify-center mx-4 transition-all duration-300 ease-in-out">
                        <Icons.Add className="w-4 h-4 fill-current flex-shrink-0" />
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