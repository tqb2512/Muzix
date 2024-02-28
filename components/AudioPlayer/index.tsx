"use client"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/libs/store";
import * as player from "@/libs/features/slices/player";
import * as queue from "@/libs/features/slices/queue";
import * as songsAPI from "@/libs/features/apiSlices/songs";

export default function AudioPlayer() {
    
    const dispatch = useDispatch();
    const playerState = useSelector((state: RootState) => state.player);
    const queueState = useSelector((state: RootState) => state.queue);
    const { data } = songsAPI.useGetSongbyIdQuery(playerState.song.song_id);

    useEffect(() => {
        if (data) {
            dispatch(player.setUrlSource(data?.url));
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (queueState.songs.length > 0) {
            dispatch(player.setSong(queueState.songs[0]));
        } else {
            dispatch(player.setSong({} as any));
            dispatch(player.setUrlSource(""));
        }
    }, [queueState.songs, dispatch]);

    return (
        <div>
            <audio 
                src={playerState.urlSource} 
                controls 
                autoPlay
                onTimeUpdate={(e) => dispatch(player.setTime(e.currentTarget.currentTime))}
                onPlay={() => dispatch(player.setStatus("playing"))}
                onPause={() => dispatch(player.setStatus("paused"))}
                onEnded={() => dispatch(queue.shift())}
            ></audio>
            <h1>{playerState.song.name}</h1>

            <ul>
                {queueState.songs.map((song, index) => {
                    return (
                        <li key={index}>
                            {song.name} {index === 0 ? " Now Playing " : ""}
                            <button onClick={() => dispatch(queue.removeAtIndex(queueState.songs.indexOf(song)))}>Remove</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    )

}
