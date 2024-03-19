import * as artistsAPI from '@/libs/features/apiSlices/artists'
import { artist } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

export default function ArtistBox({ artist }: { artist: artist }) {
    const { data, error, isLoading } = artistsAPI.useGetCoverbyIdQuery(artist.artist_id)

    return (
        <Link
            href={`/artist/${artist.artist_id}`}
            className="w-52 h-[276px] p-3 rounded-md hover:bg-hover-gray-background transition duration-300">
            <div className="w-full h-full">
                <div className="flex flex-col items-center w-full h-full">
                    <div className="rounded-full overflow-hidden relative w-full h-[184px]">
                        <Image src={data?.url || "/next.svg"} alt="artist image" layout='fill' objectFit='cover' />
                    </div>
                    <div className="mt-2 w-full">
                        <div className="truncate">
                            {artist.name}
                        </div>
                        <div className="text-gray-text text-sm">
                            Artist
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}