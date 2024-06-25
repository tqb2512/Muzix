"use client";
import * as sectionsAPI from "@/libs/Redux/features/apiSlices/sections";
import AlbumBox from "@/components/Container/Home/Section/Album";
import ArtistBox from "@/components/Container/Home/Section/Artist";
import PlaylistBox from "@/components/Container/Home/Section/Playlist";
import {useEffect, useRef, useState} from "react";

interface SectionContainerProps {
    section_id: string;
}

function sortByCreatedAt(a: any, b: any) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
}

export default function SectionContainer({section_id}: SectionContainerProps) {

    const {data: section} = sectionsAPI.useGetSectionByIdQuery(section_id);
    const [numOfCols, setNumOfCols] = useState(6);
    const containerRef = useRef<HTMLDivElement>(null);
    const items = [...(section?.section?.section_albums || []), ...(section?.section?.section_artists || []), ...(section?.section?.section_playlists || [])]
    items.sort(sortByCreatedAt)

    const renderItems = items.map((item, index) => {

        if ('album' in item) {
            return <AlbumBox key={index} album={item.album} artist={item.album.artist}/>
        } else if ('artist' in item) {
            return <ArtistBox key={index} artist={item.artist}/>
        } else if ('playlist' in item) {
            return <PlaylistBox key={index} playlist={item.playlist}/>
        }
    })

    useEffect(() => {
        const handleResize = (entries: any) => {
            for (let entry of entries) {
                setNumOfCols(Math.floor(entry.contentRect.width / 208));
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);

        const currentRef = containerRef.current;
        if (currentRef) {
            resizeObserver.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                resizeObserver.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="px-6">
            <h1 className="text-2xl font-bold mt-6">{section?.section?.name}</h1>
            <div className={`grid gap-4 mt-2`}
                 style={{
                     gridTemplateColumns: `repeat(${numOfCols}, minmax(0, 1fr))`
                 }}>
                {renderItems}
            </div>
        </div>
    )
}