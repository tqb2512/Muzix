"use client";
import * as artistsAPI from "@/libs/Redux/features/apiSlices/artists";
import * as Icons from "./Icons";
import Image from "next/image";
import AlbumTable from "./AlbumTable";
import ListTable from "../Album/SongTable";
import React, {useContext} from "react";
import {ColorContext} from "@/components/MainPanel/ColorContext";

interface ArtistContainerProps {
    artist_id: string;
}

export default function ArtistContainer({artist_id}: ArtistContainerProps) {

    const {data: artist} = artistsAPI.useGetInfoByIdQuery(artist_id);
    const {data: coverUrl} = artistsAPI.useGetCoverByIdQuery(artist_id);
    const {data: songs} = artistsAPI.useGetSongsByIdQuery(artist_id);
    const {color} = useContext(ColorContext);

    return (
        <div className="bg-gradient-to-b from-transparent to-dark-background to-[50dvh]"
             style={{backgroundColor: color}}>
            <div className="px-6 pb-4 flex">
                <div className="h-52 w-52 rounded-full overflow-hidden relative flex-shrink-0">
                    <Image
                        id="coverImage"
                        src={coverUrl?.url || "/next.svg"} alt="Artist cover" fill sizes="208px"
                        className="object-cover"/>
                </div>
                <div className="ml-5 flex flex-col justify-end mb-2 space-y-2">
                    <div className="text-6xl font-bold">{artist?.artist.name}</div>
                    <div className="flex items-center space-x-2 text-sm">

                    </div>
                </div>
            </div>

            <div className="px-6 bg-dark-background bg-opacity-60">
                <div className="h-24 w-full flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-green-500 h-12 w-12 flex items-center justify-center">
                            <Icons.Play className="w-5 h-5 fill-current text-black"/>
                        </div>
                        <div className="rounded-full bg-transparent h-12 w-12 flex items-center justify-center">
                            <Icons.ThreeDots className="w-7 h-7 fill-current text-gray-button"/>
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