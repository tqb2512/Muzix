"use client"
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/libs/Redux/store";
import * as player from "@/libs/Redux/features/slices/player";
import * as usersAPI from "@/libs/Redux/features/apiSlices/users";
import {skipToken} from "@reduxjs/toolkit/query";

export default function ProgressBar({ audioRef }: { audioRef: any }) {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const playerState = useSelector((state: RootState) => state.player);
    const progressRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className="h-1 w-full bg-gray-500 rounded-full hover:cursor-pointer"
            ref={barRef}
            onMouseOver={() => {
                progressRef.current?.classList.add("bg-green-500");
            }}
            onMouseLeave={() => {
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
                className="h-full bg-gray-50 rounded-full w-0 transition-all duration-100"
                style={{ width: `${(playerState.time / (audioRef.current?.duration || 0)) * 100}%` }}
            >
            </div>

        </div>
    )
}