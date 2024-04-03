import * as albumsAPI from "@/libs/features/apiSlices/albums";
import {album, artist} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function AlbumBox({ album, artist }: { album: album, artist: artist }) {
    const { data } = albumsAPI.useGetCoverByIdQuery(album.album_id)

    return (
        <Link
            href={`/app/album/${album.album_id}`}
            className="w-52 h-[276px] p-3 rounded-md hover:bg-hover-gray-background transition duration-300">
            <div className="w-full h-full">
                <div className="flex flex-col items-center w-full h-full">
                    <div className="rounded-md overflow-hidden relative w-[184px] h-[184px]">
                        <Image
                            src={data?.url || "/next.svg"}
                            alt="album image"
                            className="object-cover"
                            fill
                            sizes="184px"
                        />
                    </div>
                    <div className="mt-2 w-full">
                        <div className="truncate">
                            {album.name}
                        </div>
                        <div className="text-gray-text text-sm">
                            {artist.name}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}