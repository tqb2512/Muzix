"use client";
import * as artistsAPI from "@/libs/Redux/features/apiSlices/artists";
import * as Icons from "./Icons";
import Image from "next/image";
import AlbumTable from "./AlbumTable";
import ListTable from "../Album/SongTable";
import React, {useContext} from "react";
import {ColorContext} from "@/components/MainPanel/ColorContext";
import * as queue from "@/libs/Redux/features/slices/queue";
import {useDispatch} from "react-redux";

interface ArtistContainerProps {
    artist_id: string;
}

export default function ArtistContainer({artist_id}: ArtistContainerProps) {

    const dispatch = useDispatch();
    const {data: artist} = artistsAPI.useGetInfoByIdQuery(artist_id);
    const {data: coverUrl} = artistsAPI.useGetCoverByIdQuery(artist_id);
    const {data: songs} = artistsAPI.useGetSongsByIdQuery(artist_id);
    const {color} = useContext(ColorContext);
    const handlePlay = () => {
        dispatch(queue.clear());
        songs?.songs.forEach((song) => {
            dispatch(queue.push(song));
        })
    }

    return (
        <div className="bg-gradient-to-b from-transparent to-dark-background to-[50dvh]"
             style={{backgroundColor: color}}>
            <div className="px-6 pb-6 flex">
                <div className="h-52 w-52 rounded-full overflow-hidden relative flex-shrink-0">
                    <Image
                        id="coverImage"
                        src={coverUrl?.url || "/next.svg"} alt="Artist cover" fill sizes="208px"
                        className="object-cover"/>
                </div>
                <div className="ml-5 flex flex-col justify-end mb-2 space-y-2">
                    <div className="text-sm">Artist</div>
                    <div className="text-6xl font-bold">{artist?.artist.name}</div>
                    <div className="flex items-center space-x-2 text-sm">

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
                                document.getElementById("artist-dropdown")?.classList.toggle("hidden");
                            }}
                            className="rounded-full bg-transparent h-12 w-12 flex items-center justify-center">
                            <Icons.ThreeDots className="w-7 h-7 fill-current text-gray-button"/>
                        </button>
                        <div
                            id="artist-dropdown"
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

                <div>
                    <div className="text-2xl font-bold">Popular</div>
                    <ListTable songs={songs?.songs || []}/>
                </div>
                <AlbumTable albums={artist?.artist.album || []}/>
            </div>
        </div>
    )
}