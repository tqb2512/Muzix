"use client"
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {skipToken} from "@reduxjs/toolkit/query";
import {RootState} from "@/libs/Redux/store";
import * as player from "@/libs/Redux/features/slices/player";
import * as queue from "@/libs/Redux/features/slices/queue";
import * as songsAPI from "@/libs/Redux/features/apiSlices/songs";
import NowPlaying from "./NowPlaying";
import RightBar from "./RightBar";
import * as Icons from "./Icons"
import ProgressBar from "./ProgressBar";

function toMMSS(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

export default function AudioPlayer({className}: {className?: string}) {

    const dispatch = useDispatch();
    const playerState = useSelector((state: RootState) => state.player);
    const queueState = useSelector((state: RootState) => state.queue);
    const audioRef = useRef<HTMLAudioElement>(null);
    const { data: songUrl } = songsAPI.useGetFileByIdQuery(playerState.song.song_id || skipToken);

    useEffect(() => {
        if (songUrl) {
            dispatch(player.setUrlSource(songUrl.url));
        }
    }, [songUrl, dispatch]);

    useEffect(() => {
        if (queueState.songs.length > 0) {
            dispatch(player.setSong(queueState.songs[0]));
        } else {
            dispatch(player.setSong({} as any));
            dispatch(player.setUrlSource(""));
        }
    }, [queueState.songs, dispatch]);

    const handlePlayBtn = () => {
        if (playerState.status === "playing") {
            audioRef.current?.pause();
            dispatch(player.setStatus("paused"));
        } else {
            audioRef.current?.play();
            dispatch(player.setStatus("playing"));
        }
    }

    return (
        <div className={className}>
            <audio
                ref={audioRef}
                id="audioPlayer"
                src={playerState.urlSource}
                //autoPlay
                onTimeUpdate={(e) => dispatch(player.setTime(e.currentTarget.currentTime))}
                onPlay={() => dispatch(player.setStatus("playing"))}
                onPause={() => dispatch(player.setStatus("paused"))}
                onEnded={() => dispatch(queue.shift())}
            ></audio>

            <div className="flex items-center justify-between">

                <NowPlaying />

                <div className="flex flex-col items-center justify-center flex-grow space-y-2">
                    <div className="flex space-x-8">
                        <button>
                            <Icons.Shuffle className="w-4 h-4 fill-current text-gray-300 hover:text-white" />
                        </button>

                        <button onClick={() => {
                            if (audioRef.current)
                                if (audioRef.current.currentTime > 5) {
                                    audioRef.current.currentTime = 0;
                                } else {

                                }
                        }}>
                            <Icons.Previous className="w-4 h-4 fill-current text-gray-300 hover:text-white" />
                        </button>

                        <button onClick={handlePlayBtn} className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                            {
                                playerState.status !== "playing" ?
                                    <Icons.Play className="w-4 h-4 fill-current text-black" /> :
                                    <Icons.Pause className="w-4 h-4 fill-current text-black" />
                            }
                        </button>

                        <button onClick={() => {
                            if (queueState.songs.length > 1) {
                                dispatch(queue.shift());
                            } else {

                            }
                        }}>
                            <Icons.Next className="w-4 h-4 fill-current text-gray-300 hover:text-white" />
                        </button>

                        <button>
                            <Icons.Repeat className="w-4 h-4 fill-current text-gray-300 hover:text-white" />
                        </button>
                    </div>

                    <div className="flex items-center justify-between w-10/12 space-x-2">
                        <div className="whitespace-nowrap text-sm">
                            {toMMSS(playerState.time)}
                        </div>

                        <ProgressBar audioRef={audioRef} />

                        <div className="whitespace-nowrap text-sm">
                            {playerState.song.song_id ? toMMSS(audioRef.current?.duration || 0) : "--:--"}
                        </div>
                    </div>
                </div>
                        
                <RightBar audioRef={audioRef} />

            </div>
        </div>
    )

}
