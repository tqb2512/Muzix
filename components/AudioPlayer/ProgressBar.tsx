"use client"
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/libs/store";
import * as player from "@/libs/features/slices/player";

export default function ProgressBar({ audioRef }: { audioRef: any }) {

    const dispatch = useDispatch();
    const playerState = useSelector((state: RootState) => state.player);
    const progressRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const knobRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className="h-1 w-full bg-gray-500 rounded-full hover:cursor-pointer"
            ref={barRef}
            onMouseOver={(e) => {
                progressRef.current?.classList.add("bg-green-500");
            }}
            onMouseLeave={(e) => {
                progressRef.current?.classList.remove("bg-green-500");
            }}
            onClick={(e) => {
                const bar = barRef.current;
                const rect = bar?.getBoundingClientRect();
                const x = e.clientX - (rect?.left || 0);
                const width = bar?.clientWidth;
                const percentage = x / (width || 1);
                audioRef.current.currentTime = audioRef.current.duration * percentage;
                dispatch(player.setTime(audioRef.current.duration * percentage));
            }}
        >
            <div
                id="progress"
                ref={progressRef}
                className="h-full bg-gray-50 rounded-full"
                style={{ width: `${(playerState.time / (audioRef.current?.duration || 1)) * 100}%` }}
            >
            </div>

        </div>
    )
}