import * as playlistsAPI from "@/libs/features/apiSlices/playlists";
import { playlist } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function PlaylistBox({ playlist }: { playlist: playlist }) {
    const { data, error, isLoading } = playlistsAPI.useGetCoverbyIdQuery(playlist.playlist_id)

    return (
        <Link
            href={`/app/playlist/${playlist.playlist_id}`}
            className="w-52 h-[276px] p-3 rounded-md hover:bg-hover-gray-background transition duration-300">
            <div className="w-full h-full">
                <div className="flex flex-col items-center w-full h-full">
                    <div className="rounded-md overflow-hidden relative w-[184px] h-[184px]">
                        <Image 
                            src={data?.url || "/next.svg"} 
                            alt="playlist image" 
                            className="object-cover" 
                            fill
                            sizes="184px"
                            />
                    </div>
                    <div className="mt-2 w-full">
                        <div className="truncate">
                            {playlist.name}
                        </div>
                        <div className="text-gray-text text-sm">
                            {playlist.description}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}