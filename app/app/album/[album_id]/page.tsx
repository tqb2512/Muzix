"use client"

import React from "react";
import { song } from "@prisma/client";
import * as albumsAPI from "@/libs/features/apiSlices/albums";
import * as queue from "@/libs/features/slices/queue";
import { useDispatch } from "react-redux";

export default function AlbumPage({ params }: { params: { album_id: string } }) {

    const dispatch = useDispatch()
    const { data, error, isLoading } = albumsAPI.useGetSongsByIdQuery(params.album_id)

    return (
        <div>
            <div>
                {isLoading ? "Loading..." : data?.songs.map((song: song) => {
                        return (
                            <div key={song.song_id}>
                                {song.name}
                                <button onClick={() => dispatch(queue.play(song))}>Play</button>
                            </div>
                        )
                    })}

            </div>
        </div>
    )
}