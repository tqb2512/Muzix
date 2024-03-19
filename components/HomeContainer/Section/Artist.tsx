import * as artistsAPI from '@/libs/features/apiSlices/artists'
import { artist } from '@prisma/client'
import Image from 'next/image'

export default function ArtistBox({ artist }: { artist: artist }) {
    const { data, error, isLoading } = artistsAPI.useGetCoverbyIdQuery(artist.artist_id)
    return (
        <div className="w-52 h-72 p-4 rounded-md hover:bg-hover-gray-background transition duration-300">
            <div className="flex flex-col items-center justify-center">
                <Image src={data?.url || "/next.svg"} alt="artist image" width={176} height={176} className='rounded-full' />
                <div className="mt-2 w-44 truncate">
                    {artist.name}
                </div>
                <div className="w-44 text-gray-text text-sm">
                    Artist
                </div>
            </div>
        </div>
    )
}