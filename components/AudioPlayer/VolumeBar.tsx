import { useRef } from "react";
import * as Icons from "./Icons";

export default function VolumeBar({ audioRef }: { audioRef: any }) {

    const volumeRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex items-center space-x-3 w-full m-4 max-w-28">
            <Icons.Volume className="w-4 h-4 fill-current text-gray-300 hover:text-white flex-shrink-0" />
            <div
                ref={barRef}
                className="bg-gray-500 rounded-full hover:cursor-pointer h-1 w-10/12 flex-shrink-0"
                onMouseOver={() => {
                    volumeRef.current?.classList.add("bg-green-500");
                }}
                onMouseLeave={() => {
                    volumeRef.current?.classList.remove("bg-green-500");
                }}
                onClick={(e) => {
                    const rect = barRef.current?.getBoundingClientRect();
                    const x = e.clientX - rect!.left;
                    const width = barRef.current?.clientWidth;
                    audioRef.current.volume = x / width!;
                }}
            >
                <div
                    ref={volumeRef}
                    className="h-full bg-gray-50 rounded-full"
                    style={{ width: `${audioRef.current?.volume * 100}%` }}
                />
            </div>
        </div>

    )
}