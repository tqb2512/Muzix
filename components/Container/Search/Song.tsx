import {Song} from "@/app/api/search/route"
import * as albumsAPI from "@/libs/Redux/features/apiSlices/albums"
import Image from "next/image";

interface SongBoxProps {
    song: Song;
}

export default function SongBox({song}: SongBoxProps) {

    const {data: coverUrl} = albumsAPI.useGetCoverByIdQuery(song.album_id);

    return (
        <div
            className="h-[3.5rem] w-full rounded-md hover:bg-hover-gray-background p-2 flex justify-between items-center">
            <div className="h-full w-full flex flex-row space-x-2 items-center">
                <div className="size-[2.5rem] rounded-md overflow-hidden relative shrink-0">
                    <Image src={coverUrl?.url || "/next.svg"} alt="Album cover" fill sizes="40px"
                           className="object-cover"/>
                </div>
                <div className="flex flex-col">
                    <h1>{song.name}</h1>
                    <div className="flex flex-row">
                        <p>{song.album.artist.name}</p>
                        {song.artist_contribute_song.map((artist) => (
                            <p key={artist.artist.artist_id}>, {artist.artist.name}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}