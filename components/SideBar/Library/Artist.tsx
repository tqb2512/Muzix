import Link from "next/link";
import Image from "next/image";
import * as artistsAPI from "@/libs/Redux/features/apiSlices/artists";
import {artist} from "@prisma/client";
import {skipToken} from "@reduxjs/toolkit/query";

interface ArtistBoxProps {
    artist: artist;
    isExpanded?: boolean;
}

export default function ArtistBox({artist, isExpanded = true}: ArtistBoxProps) {

    const {data: coverUrl} = artistsAPI.useGetCoverByIdQuery(artist.artist_id || skipToken);

    return (
        <Link href={`/app/artist/${artist.artist_id}`}
              className={`flex items-center ${isExpanded ? 'pl-2' : 'justify-center'} w-full h-14 rounded-md hover:bg-hover-gray-background overflow-hidden`}>
            <div className={`flex space-x-3 h-full items-center ${isExpanded ? 'justify-center' : ''}`}>
                <div
                    className={`rounded-full h-10 w-10 overflow-hidden relative shrink-0 ${isExpanded ? 'flex items-center justify-center' : ''}`}>
                    <Image src={coverUrl?.url || "/next.svg"} alt="Artist cover" fill sizes="40px"
                           className="object-cover"/>
                </div>

                {isExpanded &&
                    <div className="flex flex-col justify-center w-4/5">
                        <h1 className="truncate">
                            {artist.name}
                        </h1>
                        <h1 className="text-gray-text text-sm">
                            Artist
                        </h1>
                    </div>}
            </div>
        </Link>
    )
}