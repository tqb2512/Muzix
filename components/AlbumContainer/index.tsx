"use client";
import * as albumsAPI from "@/libs/features/apiSlices/albums";
import * as artistsAPI from "@/libs/features/apiSlices/artists";
import * as Icons from "./Icons";
import { skipToken } from "@reduxjs/toolkit/query";
import Image from "next/image";
import ListTable from "./ListTable";

interface AlbumContainerProps {
    album_id: string;
}

export default function AlbumContainer({ album_id }: AlbumContainerProps) {

    const { data: songs } = albumsAPI.useGetSongsByIdQuery(album_id);
    const { data: album } = albumsAPI.useGetInfoByIdQuery(album_id);
    const { data: coverUrl } = albumsAPI.useGetCoverbyIdQuery(album_id);
    const { data: profileUrl } = artistsAPI.useGetCoverbyIdQuery(album?.album.artist_id || skipToken);

    return (
        <div>
            <div className="flex">
                <div className="h-52 w-52 rounded-lg overflow-hidden relative flex-shrink-0">
                    <Image src={coverUrl?.url || "/next.svg"} alt="Playlist cover" fill sizes="208px" className="object-cover" />
                </div>
                <div className="ml-5 flex flex-col justify-end mb-2 space-y-2">
                    <div className="text-sm">Album</div>
                    <div className="text-6xl font-bold">{album?.album.name}</div>
                    <div className="flex items-center space-x-2 text-sm">
                        <div className="h-6 w-6 overflow-hidden relative rounded-full">
                            <Image src={profileUrl?.url || "/next.svg"} alt="Profile cover" fill sizes="24px" className="object-cover" />
                        </div>
                        <h4>{album?.album.artist.name}&ensp; &bull; &ensp;{songs?.songs.length} songs, about {songs?.songs.reduce((acc, song) => acc + song.duration_ms, 0)} minutes</h4>
                    </div>
                </div>
            </div>

            <div>
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

                <ListTable songs={songs?.songs || []} />
                
            </div>

        </div>
    )
}