"use client";
import * as playlistsAPI from "@/libs/Redux/features/apiSlices/playlists";
import * as usersAPI from "@/libs/Redux/features/apiSlices/users";
import * as Icons from "./Icons";
import {skipToken} from "@reduxjs/toolkit/query";
import Image from "next/image";
import SongTable from "./SongTable";
import {ColorContext} from "@/components/MainPanel/ColorContext";
import {useContext} from "react";

interface PlaylistContainerProps {
    playlist_id: string;
}

export default function PlaylistContainer({ playlist_id }: PlaylistContainerProps) {

    const { data: songs } = playlistsAPI.useGetSongsByIdQuery(playlist_id);
    const { data: playlist } = playlistsAPI.useGetInfoByIdQuery(playlist_id);
    const { data: coverUrl } = playlistsAPI.useGetCoverByIdQuery(playlist_id);
    const { data: profileUrl } = usersAPI.useGetCoverByIdQuery(playlist?.playlist.user_id || skipToken);
    const {color} = useContext(ColorContext);

    return (
        <div className="bg-gradient-to-b from-transparent to-dark-background to-[50dvh]" style={{backgroundColor: color}}>
            <div className="px-6 pb-4 flex">
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
                        <div className="rounded-full bg-green-500 h-12 w-12 flex items-center justify-center">
                            <Icons.Play className="w-5 h-5 fill-current text-black" />
                        </div>
                        <div className="rounded-full bg-transparent h-12 w-12 flex items-center justify-center">
                            <Icons.ThreeDots className="w-7 h-7 fill-current text-gray-button" />
                        </div>
                    </div>
                </div>

                <SongTable songs={songs?.songs || []} />
                
            </div>

        </div>
    )
}