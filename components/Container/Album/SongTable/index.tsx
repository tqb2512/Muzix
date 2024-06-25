import {album, artist, artist_contribute_song, song} from "@prisma/client";
import Item from "./Item";
import * as Icons from "../Icons";
import {useEffect, useRef, useState} from "react";

export interface Song extends song {
    album: album & {
        artist: artist;
    };
    artist_contribute_song: artist_contribute_song & {
        artist: artist;
    }[];
}

interface ListTableProps {
    songs: Song[];
}

export default function ListTable({songs}: ListTableProps) {

    const headerRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSticky(!entry.isIntersecting);
            },
            { threshold: 1 }
        );

        if (headerRef.current) {
            observer.observe(headerRef.current);
        }

        return () => {
            if (headerRef.current) {
                observer.unobserve(headerRef.current);
            }
        };
    }, []);


    return (
        <div className="w-full h-full">
            <div
                ref={headerRef}
                id="song-table-header"
                className={`flex sticky items-center justify-between top-[-1px] z-10 text-gray-text h-14 border-b border-zinc-700 mb-2 ${isSticky ? 'bg-dark-background' : ''}`}>
                <div className="text-center w-12">#</div>
                <div className="w-full flex justify-between">
                    <div className="text-left w-full">Title</div>
                </div>
                <div className="flex items-center justify-center w-32">
                    <Icons.Duration className="w-5 h-5 fill-current text-gray-text"/>
                </div>
                <div className="w-12"/>
            </div>
            <div className="h-full space-y-2">
                {songs.map((song, index) => (
                    <Item key={song.song_id} song={song} index={index}/>
                ))}
            </div>
        </div>
    )
}