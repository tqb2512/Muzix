"use client";
import * as Icons from "./Icons";
import * as songsAPI from "@/libs/Redux/features/apiSlices/songs";
import * as albumsAPI from "@/libs/Redux/features/apiSlices/albums";
import * as artistsAPI from "@/libs/Redux/features/apiSlices/artists";
import * as queue from "@/libs/Redux/features/slices/queue";
import {skipToken} from "@reduxjs/toolkit/query";
import Image from "next/image";
import {useContext} from "react";
import {ColorContext} from "@/components/MainPanel/ColorContext";
import {useDispatch} from "react-redux";
import {song} from "@prisma/client";

interface SongContainerProps {
    song_id: string;
}

export default function SongContainer({ song_id }: SongContainerProps) {

    const dispatch = useDispatch();
    const { data: song } = songsAPI.useGetInfoByIdQuery(song_id);
    const { data: album } = albumsAPI.useGetInfoByIdQuery(song?.songs[0].album_id || skipToken);
    const { data: coverUrl } = albumsAPI.useGetCoverByIdQuery(song?.songs[0].album_id || skipToken);
    const { data: profileUrl } = artistsAPI.useGetCoverByIdQuery(album?.album.artist_id || skipToken);
    const {color} = useContext(ColorContext);

    return (
        <div className="bg-gradient-to-b from-transparent to-dark-background to-[50dvh]" style={{backgroundColor: color}}>
            <div className="px-6 pb-6 flex">
                <div className="h-52 w-52 rounded-lg overflow-hidden relative flex-shrink-0">
                    <Image id="coverImage" src={coverUrl?.url || "/next.svg"} alt="Playlist cover" fill sizes="208px" className="object-cover" />
                </div>
                <div className="ml-5 flex flex-col justify-end mb-2 space-y-2">
                    <div className="text-sm">Song</div>
                    <div className="text-6xl font-bold">{song?.songs[0].name}</div>
                    <div className="flex items-center space-x-2 text-sm">
                        <div className="h-6 w-6 overflow-hidden relative rounded-full">
                            <Image id="coverImage" src={profileUrl?.url || "/next.svg"} alt="Profile cover" fill sizes="24px" className="object-cover" />
                        </div>
                        <h4>{album?.album.artist.name}&ensp; &bull; &ensp;{album?.album.name} &ensp; &bull; &ensp; {song?.songs[0].duration_ms}</h4>
                    </div>
                </div>
            </div>

            <div className="px-6 bg-dark-background bg-opacity-60">
                <div className="h-24 w-full flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => {dispatch(queue.play(song?.songs[0] as song))}}
                            className="rounded-full bg-green-500 h-12 w-12 flex items-center justify-center">
                            <Icons.Play className="w-5 h-5 fill-current text-black"/>
                        </button>
                        <button
                            onClick={() => {
                                document.getElementById("song-dropdown")?.classList.toggle("hidden");
                            }}
                            className="rounded-full bg-transparent h-12 w-12 flex items-center justify-center">
                            <Icons.ThreeDots className="w-7 h-7 fill-current text-gray-button"/>
                        </button>
                        <div
                            id="song-dropdown"
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

                <div className="flex flex-row w-full">
                    <div className="w-full">
                        <div className="text-2xl font-bold">Lyrics</div>
                        <pre className="mt-4 whitespace-pre-wrap">
                            {song?.songs[0].lyrics}
                        </pre>
                    </div>

                    <div className="w-full font-bold">
                        {/* {contributorCoverUrl.map((artist) => (
                            <Link href={`/app/artist/` + artist.id} key={artist.id} className="flex flex-row space-x-4 rounded-lg hover:bg-hover-gray-background h-32 items-center w-2/3 p-4">
                                <div className="rounded-full w-20 h-20 overflow-hidden relative">
                                    <Image src={artist.url || "/next.svg"} alt="Album cover" fill sizes="80px" className="object-cover" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div>Artist</div>
                                    <div>
                                        {artist.name}
                                    </div>
                                </div>
                            </Link>
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    )
}