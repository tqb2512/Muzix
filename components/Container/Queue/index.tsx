"use client";
import { album, artist, artist_contribute_song, song } from "@prisma/client";
import { useSelector } from "react-redux";
import { RootState } from "@/libs/Redux/store";
import * as songsAPI from "@/libs/Redux/features/apiSlices/songs";
import SongCard from "./SongCard";

interface Song extends song {
    album: album & {
        artist: artist;
    };
    artist_contribute_song: artist_contribute_song & {
        artist: artist;
    }[];
}

export default function QueueContainer() {

    const queueState = useSelector((state: RootState) => state.queue);
    const { data: songsData, isLoading: songsIsLoading } = songsAPI.useGetInfoByIdQuery(
        queueState.songs.map((song) => song.song_id).join(",")
    );

    return (
        <div className="px-6 h-full overflow-y-auto">
            <h1 className="text-2xl font-bold text-white">
                Queue
            </h1>
            {
                songsIsLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    queueState.songs.map((song, index) => {
                        return (
                            <SongCard key={index} index={index} song={songsData?.songs.find((s) => s.song_id === song.song_id) as Song} />
                        )
                    })
                )
            }
        </div>
    )
}