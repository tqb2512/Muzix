"use client";
import * as Icons from "./Icons";
import Image from "next/image";
import SongTable from "./SongTable";
import * as playlistsAPI from "@/libs/Redux/features/apiSlices/playlists";
import * as usersAPI from "@/libs/Redux/features/apiSlices/users";
import * as userSlice from "@/libs/Redux/features/slices/user";
import * as queueSlice from "@/libs/Redux/features/slices/queue";
import {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/libs/Redux/store";
import {skipToken} from "@reduxjs/toolkit/query";
import {ColorContext} from "@/components/MainPanel/ColorContext";
import {playlist, user} from "@prisma/client";
import {useRouter} from "next/navigation";
import {toMMSS} from "@/components/AudioPlayer";

interface PlaylistContainerProps {
    playlist_id: string;
}

export default function PlaylistContainer({playlist_id}: PlaylistContainerProps) {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const {color} = useContext(ColorContext);
    const {data: songs, refetch: refetchSongs} = playlistsAPI.useGetSongsByIdQuery(playlist_id);
    const {data: playlist, refetch: refetchPlaylist} = playlistsAPI.useGetInfoByIdQuery(playlist_id);
    const {data: coverUrl, refetch: refetchCover} = playlistsAPI.useGetCoverByIdQuery(playlist_id);
    const {refetch: refetchUser} = usersAPI.useGetUserByIdQuery(user.user_id || skipToken);
    const {data: profileUrl} = usersAPI.useGetCoverByIdQuery(playlist?.playlist?.user_id || skipToken);
    const [action, setAction] = useState<"Follow" | "Unfollow" | "Edit">("Follow");
    const [editData, setEditData] = useState({name: "", description: ""});
    const [editImage, setEditImage] = useState<File | null>(null);
    const [sendAction] = usersAPI.useSendActionMutation();

    useEffect(() => {
        refetchCover();
        refetchPlaylist();
        refetchSongs();
    }, [playlist_id, refetchCover, refetchPlaylist, refetchSongs])

    useEffect(() => {
        if (user.user_id === playlist?.playlist?.user_id) {
            setAction("Edit");
        } else if (user.user_following_playlist?.find((followedPlaylist: any) => followedPlaylist.playlist.playlist_id === playlist_id)) {
            setAction("Unfollow");
        } else {
            setAction("Follow");
        }
    }, [user, playlist_id, playlist?.playlist?.user_id])

    const handlePlay = () => {
        dispatch(queueSlice.clear());
        songs?.songs.forEach((song) => {
            dispatch(queueSlice.push(song));
        })
    }

    const handleFollow = () => {
        if (action === "Edit") {
            setEditData({name: playlist?.playlist?.name || "", description: playlist?.playlist?.description || ""});
            document.getElementById("modal")?.classList.remove("hidden");
            return;
        }
        sendAction({
            user_id: user.user_id,
            action: action === "Follow" ? "follow" : "unfollow",
            type: "playlist",
            id: playlist_id
        }).then(() => {
            if (action === "Follow") {
                dispatch(userSlice.followPlaylist({
                    playlist: playlist?.playlist as playlist,
                    user: playlist?.playlist.user as user,
                    user_id: user.user_id,
                }))
            } else {
                dispatch(userSlice.unfollowPlaylist(playlist_id));
            }
        })
    }

    const handleDelete = () => {
        sendAction({
            user_id: user.user_id,
            action: "remove",
            type: "playlist",
            id: playlist_id,
        }).then(() => {
            dispatch(userSlice.unfollowPlaylist(playlist_id));
            refetchUser();
            router.push("/app");
        })
    }

    const imageToBase64 = (file: File) => {
        return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            }
            reader.readAsDataURL(file);
        })
    }

    if (!playlist || !songs || !coverUrl || !profileUrl) {
        return <div
            className="w-full flex items-center justify-center">
            <h1>Loading...</h1>
        </div>
    }

    return (
        <div className="bg-gradient-to-b from-transparent to-dark-background to-[50dvh]"
             style={{backgroundColor: color}}>
            <div className="px-6 pb-6 flex">
                <div className="h-52 w-52 rounded-lg overflow-hidden relative flex-shrink-0">
                    <Image id="coverImage" src={coverUrl?.url || "/next.svg"} alt="Playlist cover" fill sizes="700px"
                           className="object-cover"/>
                </div>
                <div className="ml-5 flex flex-col justify-end mb-2 space-y-2">
                    <div className="text-sm">Playlist</div>
                    <div className="text-6xl font-bold">{playlist?.playlist.name}</div>
                    <div className="text-gray-text">{playlist?.playlist.description}</div>
                    <div className="flex items-center space-x-2 text-sm">
                        <div className="h-6 w-6 overflow-hidden relative rounded-full">
                            <Image src={profileUrl?.url || "/next.svg"} alt="Profile cover" fill sizes="24px"
                                   className="object-cover"/>
                        </div>
                        <h4>{playlist?.playlist.user.username}&ensp; &bull; &ensp;{songs?.songs.length} songs,
                            about {toMMSS(songs?.songs.reduce((acc, song) => acc + song.duration_ms, 0) || 0)} minutes</h4>
                    </div>
                </div>
            </div>

            <div className="px-6 bg-dark-background bg-opacity-60">
                <div className="h-24 w-full flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handlePlay}
                            className="rounded-full bg-green-500 h-12 w-12 flex items-center justify-center">
                            <Icons.Play className="w-5 h-5 fill-current text-black"/>
                        </button>
                        <button
                            onClick={() => {
                                document.getElementById("album-dropdown")?.classList.toggle("hidden");
                            }}
                            className="rounded-full bg-transparent h-12 w-12 flex items-center justify-center">
                            <Icons.ThreeDots className="w-7 h-7 fill-current text-gray-button"/>
                        </button>
                        <div
                            id="album-dropdown"
                            className="z-50 hidden bg-neutral-800 rounded-md w-48 relative top-20 right-14 p-1">
                            <div className="flex flex-col justify-between w-full">
                                <button
                                    onClick={handleFollow}
                                    className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
                                    <h1>{action}</h1>
                                </button>
                                {user?.user_id === playlist?.playlist?.user_id && (
                                    <button
                                        onClick={handleDelete}
                                        className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
                                        <h1>Delete</h1>
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                    }}
                                    className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
                                    <h1>Share</h1>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <SongTable playlist_id={playlist_id} songs={songs?.songs || []}/>
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
                        <div className="flex flex-col space-y-4 w-full">
                            <input type="text" placeholder="Playlist name"
                                   className="w-full h-10 bg-neutral-700 rounded-md p-2"
                                   value={editData.name}
                                   onChange={(e) => setEditData({...editData, name: e.target.value})}
                            />
                            <textarea placeholder="Description"
                                      className="w-full h-full bg-neutral-700 rounded-md p-2 resize-none"
                                      value={editData.description}
                                      onChange={(e) => setEditData({...editData, description: e.target.value})}
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={() => {
                            if (editImage) {
                                imageToBase64(editImage).then((base64) => {
                                    fetch(`/api/playlists/${playlist_id}`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            name: editData.name,
                                            description: editData.description,
                                            cover: base64.split(",")[1]
                                        })
                                    }).then(() => {
                                        refetchUser();
                                        refetchPlaylist();
                                        refetchCover();
                                    })
                                })
                            } else {
                                fetch(`/api/playlists/${playlist_id}`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        name: editData.name,
                                        description: editData.description,
                                        cover: ""
                                    })
                                }).then(() => {
                                    refetchUser();
                                    refetchPlaylist();
                                })
                            }
                            document.getElementById("modal")?.classList.add("hidden");
                        }}
                                className="bg-white text-black rounded-full w-24 p-2">Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}