"use client";
import Image from "next/image";
import { useContext } from "react";
import { usersAPI } from "@/libs/Redux/features/apiSlices/users";
import { ColorContext } from "@/components/MainPanel/ColorContext";
import * as Icons from "@/components/Container/User/Icons";
import PlaylistTable from "@/components/Container/User/PlaylistTable";

interface UserContainerProps {
    user_id: string;
}

export default function UserContainer({ user_id }: UserContainerProps) {

    const { data: coverUrl } = usersAPI.useGetCoverByIdQuery(user_id);
    const { data: user } = usersAPI.useGetUserByIdQuery(user_id);
    const { color } = useContext(ColorContext);

    return (
        <div className="bg-gradient-to-b from-transparent to-dark-background to-[50dvh]"
            style={{ backgroundColor: color }}>
            <div className="flex px-6 pb-6">
                <div className="h-52 w-52 rounded-full overflow-hidden relative flex-shrink-0">
                    <Image
                        id="coverImage" src={coverUrl?.url || "/next.svg"} alt="Artist cover" fill sizes="208px"
                        className="object-cover" />
                </div>
                <div className="ml-5 flex flex-col justify-end mb-2 space-y-2">
                    <div className="text-sm">Profile</div>
                    <div className="text-6xl font-bold">{user?.user.username}</div>
                    <div className="flex items-center space-x-2 text-sm">

                    </div>
                </div>
            </div>

            <div className="px-6 bg-dark-background bg-opacity-60">
                <div className="h-24 w-full flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-transparent h-12 w-12 flex items-center justify-center">
                            <Icons.ThreeDots className="w-7 h-7 fill-current text-gray-button" />
                        </div>
                    </div>
                </div>
                <PlaylistTable playlists={user?.user.playlist || []} />
            </div>
        </div>
    )
}