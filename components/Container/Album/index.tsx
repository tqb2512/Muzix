"use client";
import * as Icons from "./Icons";
import SongTable from "./SongTable";
import * as usersAPI from "@/libs/Redux/features/apiSlices/users";
import * as albumsAPI from "@/libs/Redux/features/apiSlices/albums";
import * as artistsAPI from "@/libs/Redux/features/apiSlices/artists";
import * as queueSlice from "@/libs/Redux/features/slices/queue";
import * as userSlice from "@/libs/Redux/features/slices/user";
import {ColorContext} from "@/components/MainPanel/ColorContext";
import Image from "next/image";
import {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/libs/Redux/store";
import {skipToken} from "@reduxjs/toolkit/query";
import {album, artist} from "@prisma/client";
import {toMMSS} from "@/components/AudioPlayer";

interface AlbumContainerProps {
    album_id: string;
}

export default function AlbumContainer({album_id}: AlbumContainerProps) {

    const dispatch = useDispatch();
    const {color} = useContext(ColorContext);
    const user = useSelector((state: RootState) => state.user);
    const {data: songs} = albumsAPI.useGetSongsByIdQuery(album_id);
    const {data: album} = albumsAPI.useGetInfoByIdQuery(album_id);
    const {data: coverUrl} = albumsAPI.useGetCoverByIdQuery(album_id);
    const {data: profileUrl} = artistsAPI.useGetCoverByIdQuery(album?.album.artist_id || skipToken);
    const [action, setAction] = useState<"Like" | "Unlike">("Like");
    const [sendAction] = usersAPI.useSendActionMutation();

    const handlePlay = () => {
        dispatch(queueSlice.clear());
        songs?.songs.forEach((song) => {
            dispatch(queueSlice.push(song));
        })
    }

    useEffect(() => {
        if (user.user_like_album?.find((likedAlbum: any) => likedAlbum.album.album_id === album_id)) {
            setAction("Unlike");
        } else {
            setAction("Like");
        }
    }, [user, album_id])


    const handleFollow = () => {
        sendAction({
            user_id: user.user_id,
            action: action === "Like" ? "like" : "unlike",
            type: "album",
            id: album_id
        }).then(() => {
            if (action === "Like") {
                dispatch(userSlice.likeAlbum({
                    album: album?.album as album,
                    artist: album?.album.artist as artist,
                    user_id: user.user_id
                }))
            } else {
                dispatch(userSlice.unlikeAlbum(album_id));
            }
        })
    }

    return (
        <div className="bg-gradient-to-b from-transparent to-dark-background to-[50dvh]"
             style={{backgroundColor: color}}>
            <div className="px-6 pb-6 flex">
                <div className="h-52 w-52 rounded-lg overflow-hidden relative flex-shrink-0">
                    <Image id="coverImage" src={coverUrl?.url || "/next.svg"} alt="Playlist cover" fill sizes="208px"
                           className="object-cover"/>
                </div>
                <div className="ml-5 flex flex-col justify-end mb-2 space-y-2">
                    <div className="text-sm">Album</div>
                    <div className="text-6xl font-bold">{album?.album.name}</div>
                    <div className="flex items-center space-x-2 text-sm">
                        <div className="h-6 w-6 overflow-hidden relative rounded-full">
                            <Image src={profileUrl?.url || "/next.svg"} alt="Profile cover" fill sizes="24px"
                                   className="object-cover"/>
                        </div>
                        <h4>{album?.album.artist.name}&ensp; &bull; &ensp;{songs?.songs.length} songs,
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
                            className="z-50 hidden bg-neutral-800 rounded-md w-48 relative top-16 right-14 p-1">
                            <div className="flex flex-col justify-between w-full">
                                <button
                                    onClick={handleFollow}
                                    className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
                                    <h1>{action}</h1>
                                </button>
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

                <SongTable songs={songs?.songs || []}/>

            </div>

        </div>
    )
}