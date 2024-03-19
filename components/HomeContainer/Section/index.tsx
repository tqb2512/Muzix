import { section, section_albums, section_playlists, section_artists, album, artist, playlist } from "@prisma/client"
import AlbumBox from "./Album";
import ArtistBox from "./Artist";
import React from "react";

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

export default function Section( { section }: { section: Section } ) {
    
    const items = [...section.section_albums, ...section.section_artists, ...section.section_playlists]
    items.sort(sortByCreatedAt)

    const [numberOfItems, setNumberOfItems] = React.useState(6)

    const renderItems = items.map((item, index) => {
        if (index >= numberOfItems) {
            return null
        }
        if ('album' in item) {
            return <AlbumBox key={index} album={item.album} artist={item.album.artist} />
        } else if ('artist' in item) {
            return <ArtistBox key={index} artist={item.artist} />
        } else if ('playlist' in item) {
            return <div key={index}></div>
        }
    })

    return (
        <div
            className="flex flex-col w-full h-full mt-6">
            <div className="flex flex-row justify-between">
                <h1
                    className="text-2xl font-bold hover:underline"
                >{section.name}</h1>
                <h1
                    className="text-gray-text hover:underline font-bold"
                >Show all</h1>
            </div>

            <div 
                className="grid grid-cols-6 gap-4 mt-2">
                {renderItems}
            </div>
        </div>
    )

}