"use client";
import * as Icons from "./Icons";
import * as songsAPI from "@/libs/Redux/features/apiSlices/songs";
import * as albumsAPI from "@/libs/Redux/features/apiSlices/albums";
import * as artistsAPI from "@/libs/Redux/features/apiSlices/artists";
import * as usersAPI from "@/libs/Redux/features/apiSlices/users";
import * as userSlice from "@/libs/Redux/features/slices/user";
import * as queueSlice from "@/libs/Redux/features/slices/queue";
import { skipToken } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ColorContext } from "@/components/MainPanel/ColorContext";
import { useDispatch, useSelector } from "react-redux";
import { song, album, artist } from "@prisma/client";
import { RootState } from "@/libs/Redux/store";

interface SongContainerProps {
    song_id: string;
}

export default function SongContainer({ song_id }: SongContainerProps) {

    const dispatch = useDispatch();
    const { color } = useContext(ColorContext);
    const user = useSelector((state: RootState) => state.user);
    const { data: song } = songsAPI.useGetInfoByIdQuery(song_id);
    const { data: album } = albumsAPI.useGetInfoByIdQuery(song?.songs[0].album_id || skipToken);
    const { data: coverUrl } = albumsAPI.useGetCoverByIdQuery(song?.songs[0].album_id || skipToken);
    const { data: profileUrl } = artistsAPI.useGetCoverByIdQuery(album?.album.artist_id || skipToken);
    const [action, setAction] = useState<"Like" | "Unlike">("Like");
    const [sendAction] = usersAPI.useSendActionMutation();

    useEffect(() => {
        if (user.user_like_song?.find((likedSong: any) => likedSong.song.song_id === song_id)) {
            setAction("Unlike");
        } else {
            setAction("Like");
        }
    }, [user, song_id])

    const handlePlay = () => {
        dispatch(queueSlice.clear());
        dispatch(queueSlice.play(song?.songs[0] as song));
    }

    const handleFollow = () => {
        sendAction({
            user_id: user.user_id,
            action: action === "Like" ? "like" : "unlike",
            type: "song",
            id: song_id
        }).then(() => {
            if (action === "Like") {
                dispatch(userSlice.likeSong({
                    song: song?.songs[0] as song,
                    album: album?.album as album,
                    artist: album?.album.artist as artist,
                    user_id: user.user_id
                }))
            } else {
                dispatch(userSlice.unlikeSong(song_id));
            }
        })
    }


    return (
        <div className="bg-gradient-to-b from-transparent to-dark-background to-[50dvh]" style={{ backgroundColor: color }}>
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
                            onClick={handlePlay}
                            className="rounded-full bg-green-500 h-12 w-12 flex items-center justify-center">
                            <Icons.Play className="w-5 h-5 fill-current text-black" />
                        </button>
                        <button
                            onClick={() => {
                                document.getElementById("song-dropdown")?.classList.toggle("hidden");
                            }}
                            className="rounded-full bg-transparent h-12 w-12 flex items-center justify-center">
                            <Icons.ThreeDots className="w-7 h-7 fill-current text-gray-button" />
                        </button>
                        <div
                            id="song-dropdown"
                            className="z-50 hidden bg-neutral-800 rounded-md w-48 relative top-[5rem] right-14 p-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                            <div className="flex flex-col justify-between w-full">
                                <div className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2 group">
                                    <h1>Add to playlist</h1>
                                    <div id="combo box" className="hidden group-hover:block">
                                        <div className="absolute z-50 bg-neutral-800 rounded-md w-48 top-1 left-[11.5rem] p-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                                            {user.playlist?.map((playlist, index) => (
                                                <button
                                                    onClick={() => {
                                                    sendAction({
                                                        user_id: user.user_id,
                                                        action: "add",
                                                        type: "song",
                                                        id: song_id,
                                                        query_playlist_id: playlist.playlist_id
                                                    })}}
                                                    key={index}
                                                    className="w-full h-10 hover:bg-neutral-700 rounded-sm flex items-center p-2">
                                                    <h1>{playlist.name}</h1>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleFollow}
                                    className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
                                    <h1>{action}</h1>
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