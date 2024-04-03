import {album} from "@prisma/client";
import * as albumsAPI from "@/libs/Redux/features/apiSlices/albums";
import Image from "next/image";
import Link from "next/link";

export default function TableItem({ album }: { album: album }) {
    const { data: coverUrl } = albumsAPI.useGetCoverByIdQuery(album.album_id);

    return (
        <Link
            href={`/app/album/${album.album_id}`}
            className="w-52 h-[276px] p-3 rounded-md hover:bg-hover-gray-background transition duration-300">
            <div className="w-full h-full">
                <div className="flex flex-col items-center w-full h-full">
                    <div className="rounded-md overflow-hidden relative w-[184px] h-[184px]">
                        <Image
                            src={coverUrl?.url || "/next.svg"}
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
                    </div>
                </div>
            </div>
        </Link>
    )
}