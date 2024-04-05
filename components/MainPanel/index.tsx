"use client"
import Navbar from "./Navbar";
import {useEffect, useState} from "react";
import {ColorContext} from "@/components/MainPanel/ColorContext";
import {usePathname} from "next/navigation";

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

export default function MainPanel({children,}: Readonly<{ children: React.ReactNode; }>) {
    const pathName = usePathname();
    const [color, setColor] = useState("#121212");

    useEffect(() => {
        setColor("#121212");
        const cover = document.getElementById("coverImage") as HTMLImageElement;
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
    }, [pathName]);

    return (
        <ColorContext.Provider value={{color, setColor}}>
            <div className="rounded-lg bg-dark-background h-full w-full">
                <div className="flex flex-col h-full">
                    <Navbar/>
                    <div className="h-full overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </ColorContext.Provider>
    )
}