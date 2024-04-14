"use client";
import { ColorContext } from "@/components/MainPanel/ColorContext";
import { RootState } from "@/libs/Redux/store";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";

function rgbToHex(uint8ClampedArrayElement: number, uint8ClampedArrayElement2: number, uint8ClampedArrayElement3: number) {
    return ((uint8ClampedArrayElement << 16) + (uint8ClampedArrayElement2 << 8) + uint8ClampedArrayElement3).toString(16).padStart(6, '0');
}

function darkenColor(color: string, amount: number) {
    let [r, g, b] = color.slice(1).match(/.{2}/g)!.map((c) => parseInt(c, 16));
    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);
    return `#${((r << 16) + (g << 8) + b).toString(16).padStart(6, '0')}`;
}


export default function LyricsContainer() {

    const { color, setColor } = useContext(ColorContext);
    const player = useSelector((state: RootState) => state.player);

    useEffect(() => {
        setColor("#121212");
        const cover = document.getElementById("playerSongCover") as HTMLImageElement;
        if (cover) {
            const loadImage = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = 1;
                canvas.height = 1;
                ctx?.drawImage(cover as HTMLImageElement, 0, 0, 1, 1);
                const color = ctx?.getImageData(0, 0, 1, 1).data;
                const hex = "#" + ("000000" + rgbToHex(color![0], color![1], color![2])).slice(-6);
                const darkenedColor = darkenColor(hex, 80)
                setColor(darkenedColor);
            };

            if (cover.complete) {
                loadImage();
            } else {
                cover.addEventListener("load", loadImage);
            }
        }
    }, [setColor]);

    return (
        <div className="px-6 flex justify-center" style={{ backgroundColor: color }}>
            <pre className="whitespace-pre-wrap text-3xl leading-10">
                {player.song.lyrics}
            </pre>
        </div>
    )
}