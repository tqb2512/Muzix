"use client";
import Image from "next/image";
import {useContext, useState} from "react";
import { usersAPI } from "@/libs/Redux/features/apiSlices/users";
import { ColorContext } from "@/components/MainPanel/ColorContext";
import * as Icons from "@/components/Container/User/Icons";
import PlaylistTable from "@/components/Container/User/PlaylistTable";
import {useSelector} from "react-redux";
import {RootState} from "@/libs/Redux/store";

interface UserContainerProps {
    user_id: string;
}

export default function UserContainer({ user_id }: UserContainerProps) {

    const userState = useSelector((state: RootState) => state.user);
    const { data: coverUrl, refetch: refetchCover } = usersAPI.useGetCoverByIdQuery(user_id);
    const { data: user } = usersAPI.useGetUserByIdQuery(user_id);
    const { color } = useContext(ColorContext);
    const [editImage, setEditImage] = useState<File | null>(null);

    const imageToBase64 = (file: File | null) => {
        if (!file) return Promise.resolve("");
        return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            }
            reader.readAsDataURL(file);
        })
    }

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
                            <button
                                onClick={() => {
                                    document.getElementById("album-dropdown")?.classList.toggle("hidden");
                                }}
                                className="rounded-full bg-transparent h-12 w-12 flex items-center justify-center">
                                <Icons.ThreeDots className="w-7 h-7 fill-current text-gray-button"/>
                            </button>
                            <div
                                id="album-dropdown"
                                className="z-50 hidden bg-neutral-800 rounded-md w-48 relative top-16 right-14 p-1">
                                <div className="flex flex-col justify-between w-full">
                                    {user_id === userState.user_id && (
                                        <button
                                            onClick={() => {
                                                document.getElementById("modal")?.classList.remove("hidden");
                                            }}
                                            className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
                                            <h1>Change Profile Cover</h1>
                                        </button>
                                    )}
                                    <button
                                        className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
                                        <h1>Share</h1>
                                    </button>
                                </div>

                        </div>
                    </div>
                </div>
                <PlaylistTable playlists={user?.user.playlist || []}/>
            </div>

            <div id="modal"
                 className="hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <div className="bg-neutral-800 rounded-lg p-6 w-[32rem]">
                    <div className="relative flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Edit details</h1>
                        <button
                            onClick={() => {
                                document.getElementById("modal")?.classList.add("hidden");
                            }}
                            className="rounded-full bg-transparent h-8 w-8 flex items-center justify-center hover:bg-hover-gray-background">
                            <Icons.Close className="w-4 h-4 fill-current text-white"/>
                        </button>
                    </div>
                    <div className="flex w-full flex-row space-x-4 mt-4">
                        <div className="size-[10rem] rounded-md shrink-0 relative overflow-hidden">
                            <Image src={editImage ? URL.createObjectURL(editImage) : (coverUrl?.url || "next.svg")}
                                   alt="Playlist cover" fill sizes="160px" className="object-cover"/>
                            <input type="file" accept="image/*"
                                   className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                   onChange={(e) => setEditImage(e.target.files?.[0] || null)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={() => {
                            imageToBase64(editImage).then((base64) => {
                                fetch(`/api/users/cover/update?id=${user_id}`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            cover: base64.split(",")[1]
                                        })
                                    }).then(() => {
                                        document.getElementById("modal")?.classList.add("hidden");
                                        refetchCover();
                                    })
                                })
                            }}
                            className="rounded-full bg-primary h-8 w-24 flex items-center justify-center hover:bg-hover-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}