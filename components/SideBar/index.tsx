"use client"

import { LibrarySection } from "./Library";
import NavigatorSection from "./Navigator";
import { useState, useRef, useEffect } from "react";

export default function SideBar({ className }: { className?: string }) {

    const [isExpanded, setIsExpanded] = useState(true);
    const sideBarRef = useRef<HTMLDivElement>(null);

    return (
        <div className={`flex h-full pl-2 pb-2 pt-2 pr-1 ${className}`}>
            <div
                ref={sideBarRef}
                className="flex flex-col space-y-2 h-full"
                style={{ width: "250px" }}
            >
                <NavigatorSection isExpanded={isExpanded} />
                <LibrarySection isExpanded={isExpanded} />
            </div>
            <div
                className="w-1 h-full hover:bg-neutral-800 transition-all duration-300 ease-in-out hover:cursor-grab"
                onMouseDown={(e) => {
                    const sideBar = sideBarRef.current;
                    const x = e.clientX;
                    const width = sideBar?.clientWidth;
                    const onMouseMove = (e: MouseEvent) => {
                        const newWidth = (width || 0) + (e.clientX - x);
                        if (newWidth > 250) {
                            sideBar?.style.setProperty("width", `${newWidth}px`);
                        }
                        else if (newWidth < 100) {
                            sideBar?.style.setProperty("width", "74px");
                            setIsExpanded(false);

                        } else {
                            sideBar?.style.setProperty("width", `250px`);
                            if (newWidth < 100) {
                                setIsExpanded(false);
                            } else {
                                setIsExpanded(true);
                            }
                        }
                    }
                    document.addEventListener("mousemove", onMouseMove);
                    document.addEventListener("mouseup", () => {
                        document.removeEventListener("mousemove", onMouseMove);
                    });

                }}
            >
            </div>
        </div>
    );
}