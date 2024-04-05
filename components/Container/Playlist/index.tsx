"use client";
import * as playlistsAPI from "@/libs/Redux/features/apiSlices/playlists";
import * as usersAPI from "@/libs/Redux/features/apiSlices/users";
import * as Icons from "./Icons";
import {skipToken} from "@reduxjs/toolkit/query";
import Image from "next/image";
import SongTable from "./SongTable";
import {ColorContext} from "@/components/MainPanel/ColorContext";
import {useContext} from "react";
import * as queue from "@/libs/Redux/features/slices/queue";
import {useDispatch} from "react-redux";

interface PlaylistContainerProps {
    playlist_id: string;
}

export default function PlaylistContainer({ playlist_id }: PlaylistContainerProps) {

    const dispatch = useDispatch();
    const { data: songs } = playlistsAPI.useGetSongsByIdQuery(playlist_id);
    const { data: playlist } = playlistsAPI.useGetInfoByIdQuery(playlist_id);
    const { data: coverUrl } = playlistsAPI.useGetCoverByIdQuery(playlist_id);
    const { data: profileUrl } = usersAPI.useGetCoverByIdQuery(playlist?.playlist.user_id || skipToken);
    const {color} = useContext(ColorContext);

    const handlePlay = () => {
        dispatch(queue.clear());
        songs?.songs.forEach((song) => {
            dispatch(queue.push(song));
        })
    }

    return (
        <div className="bg-gradient-to-b from-transparent to-dark-background to-[50dvh]" style={{backgroundColor: color}}>
            <div className="px-6 pb-6 flex">
                <div className="h-52 w-52 rounded-lg overflow-hidden relative flex-shrink-0">
                    <Image id="coverImage" src={coverUrl?.url || "/next.svg"} alt="Playlist cover" fill sizes="208px" className="object-cover" />
                </div>
                <div className="ml-5 flex flex-col justify-end mb-2 space-y-2">
                    <div className="text-sm">Playlist</div>
                    <div className="text-6xl font-bold">{playlist?.playlist.name}</div>
                    <div className="text-gray-text">{playlist?.playlist.description}</div>
                    <div className="flex items-center space-x-2 text-sm">
                        <div className="h-6 w-6 overflow-hidden relative rounded-full">
                            <Image src={profileUrl?.url || "/next.svg"} alt="Profile cover" fill sizes="24px" className="object-cover" />
                        </div>
                        <h4>{playlist?.playlist.user.username}&ensp; &bull; &ensp;{songs?.songs.length} songs, about {songs?.songs.reduce((acc, song) => acc + song.duration_ms, 0)} minutes</h4>
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
                                <button className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
                                    <h1>Follow</h1>
                                </button>
                                <button className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
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