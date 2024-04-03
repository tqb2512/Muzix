"use client"
import {album, artist, artist_contribute_song, song} from "@prisma/client";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {skipToken} from "@reduxjs/toolkit/query";
import {RootState} from "@/libs/Redux/store";
import * as player from "@/libs/Redux/features/slices/player";
import * as albumsAPI from "@/libs/Redux/features/apiSlices/albums";
import Image from "next/image";
import Link from "next/link";

interface Song extends song {
    album: album & {
        artist: artist;
    };
    artist_contribute_song: artist_contribute_song & {
        artist: artist;
    }[];
}

export default function NowPlaying() {

    const dispatch = useDispatch();
    const playerState = useSelector((state: RootState) => state.player);
    const { data: albumCoverUrl } = albumsAPI.useGetCoverByIdQuery(playerState.song.album_id || skipToken);
    const [song, setSong] = useState<Song | null>(null);

    useEffect(() => {
        if (playerState.song.song_id)
            fetch(`/api/songs/${playerState.song.song_id}`)
                .then((res) => res.json())
                .then((data) => {
                    setSong(data.song);
                });
    }, [playerState.song.song_id]);

    useEffect(() => {
        if (albumCoverUrl) {
            dispatch(player.setUrlImage(albumCoverUrl?.url || "/next.svg"));
        }
    }, [albumCoverUrl, dispatch]);

    return (
        <div className="flex items-center space-x-4 w-3/12">

            <Image
                src={playerState.urlImage || "/next.svg"}
                alt="Album cover"
                width={58}
                height={58}
                className="rounded-md flex-shrink-0" />

            <div className="flex flex-col space-y-1">

                <div>
                    <Link
                        href={`/app/albums/${song?.album.album_id}`}
                        className="text-sm font-bold hover:text-white hover:underline">
                        {song?.name}
                    </Link>
                </div>

                <div className="text-xs text-gray-500">
                    <Link
                        href={`/app/artists/${song?.album.artist.artist_id}`}
                        className="hover:text-white hover:underline"
                    >
                        {song?.album.artist.name}
                    </Link>
                    {song?.artist_contribute_song.map((artist) => {
                        return (
                            <Link key={artist.artist.artist_id} href={`/app/artists/${artist.artist.artist_id}`}>
                                <span>, {artist.artist.name}</span>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </div>
    )
}