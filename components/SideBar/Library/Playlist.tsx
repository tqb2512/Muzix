import Link from "next/link";
import Image from "next/image";
import * as playlistsAPI from "@/libs/Redux/features/apiSlices/playlists";
import { playlist } from "@prisma/client";
import { skipToken } from "@reduxjs/toolkit/query";

interface PlaylistBoxProps {
    playlist: playlist;
    isExpanded?: boolean;
}


export default function PlaylistBox({ playlist, isExpanded = true }: PlaylistBoxProps) {

    const { data: coverUrl } = playlistsAPI.useGetCoverByIdQuery(playlist.playlist_id || skipToken);

    return (
        <Link href={`/app/playlist/${playlist.playlist_id}`}
            className={`flex items-center ${isExpanded ? 'pl-2' : 'justify-center'} w-full h-14 rounded-md hover:bg-hover-gray-background overflow-hidden`}>
            <div className={`flex space-x-3 h-full items-center ${isExpanded ? 'justify-center' : ''}`}>
                <div
                    className={`rounded-md h-10 w-10 overflow-hidden relative shrink-0 ${isExpanded ? 'flex items-center justify-center' : ''}`}>
                    <Image src={coverUrl?.url || "/next.svg"} alt="Playlist cover" fill sizes="40px"
                        className="object-cover" />
                </div>

                {isExpanded &&
                    <div className="flex flex-col justify-center w-full">
                        <h1 className="truncate">
                            {playlist.name}
                        </h1>
                        <h1 className="text-gray-text text-sm">
                            Album
                        </h1>
                    </div>}
            </div>
        </Link>
    )
}