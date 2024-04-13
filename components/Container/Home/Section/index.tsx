import { album, artist, playlist, section, section_albums, section_artists, section_playlists } from "@prisma/client";
import AlbumBox from "./Album";
import ArtistBox from "./Artist";
import PlaylistBox from "./Playlist";
import React from "react";
import Link from "next/link";

interface Section extends section {
    section_albums: section_albums & {
        album: album & {
            artist: artist
        }
    }[];
    section_artists: section_artists & {
        artist: artist
    }[];
    section_playlists: section_playlists & {
        playlist: playlist
    }[];
}

function sortByCreatedAt(a: any, b: any) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
}

export default function Section({ section }: { section: Section }) {

    const items = [...section.section_albums, ...section.section_artists, ...section.section_playlists]
    const [numOfCols, setNumOfCols] = React.useState(6);
    const containerRef = React.useRef<HTMLDivElement>(null);
    items.sort(sortByCreatedAt)

    const renderItems = items.map((item, index) => {
        if (index >= numOfCols) {
            return null
        }
        if ('album' in item) {
            return <AlbumBox key={index} album={item.album} artist={item.album.artist} />
        } else if ('artist' in item) {
            return <ArtistBox key={index} artist={item.artist} />
        } else if ('playlist' in item) {
            return <PlaylistBox key={index} playlist={item.playlist} />
        }
    })

    React.useEffect(() => {
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
            className="flex flex-col w-full h-full mt-6">
            <div className="flex flex-row justify-between items-center">
                <Link
                    href={`/section/${section.section_id}`}
                    className="text-2xl font-bold hover:underline"
                >{section.name}</Link>
                <Link
                    href={`/section/${section.section_id}`}
                    className="text-gray-text hover:underline font-bold"
                >Show all</Link>
            </div>

            <div
                className={`grid gap-4 mt-2`}
                style={{
                    gridTemplateColumns: `repeat(${numOfCols}, minmax(0, 1fr))`
                }}
            >
                {renderItems}
            </div>
        </div>
    )

}