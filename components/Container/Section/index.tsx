"use client";
import * as sectionsAPI from "@/libs/Redux/features/apiSlices/sections";
import AlbumBox from "@/components/Container/Home/Section/Album";
import ArtistBox from "@/components/Container/Home/Section/Artist";
import PlaylistBox from "@/components/Container/Home/Section/Playlist";

interface SectionContainerProps {
    section_id: string;
}

function sortByCreatedAt(a: any, b: any) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
}

export default function SectionContainer({ section_id }: SectionContainerProps) {

    const { data: section } = sectionsAPI.useGetSectionByIdQuery(section_id);
    const items = [...(section?.section?.section_albums || []), ...(section?.section?.section_artists || []), ...(section?.section?.section_playlists || [])]
    items.sort(sortByCreatedAt)
    
    const renderItems = items.map((item, index) => {
        
        if ('album' in item) {
            return <AlbumBox key={index} album={item.album} artist={item.album.artist} />
        } else if ('artist' in item) {
            return <ArtistBox key={index} artist={item.artist} />
        } else if ('playlist' in item) {
            return <PlaylistBox key={index} playlist={item.playlist} />
        }
    })

    return (
        <div className="px-6">
            <h1 className="text-2xl font-bold mt-6">{section?.section?.name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-6">
                {renderItems}
            </div>
        </div>
    )
}