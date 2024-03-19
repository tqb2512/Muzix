import * as albumsAPI from '@/libs/features/apiSlices/albums'
import { album, artist } from '@prisma/client'
import Image from 'next/image'


export default function AlbumBox({ album, artist }: { album: album, artist: artist }) {
    const { data, error, isLoading } = albumsAPI.useGetCoverbyIdQuery(album.album_id)
    return (
        <div className="w-52 h-72 p-4 rounded-md hover:bg-hover-gray-background transition duration-300">
            <div className="flex flex-col items-center justify-center">
                <Image src={data?.url || "/next.svg"} alt="album image" width={176} height={176} className='rounded-md' />
                <div className="mt-2 w-44 truncate">
                    {album.name}
                </div>
                <div className="w-44 text-gray-text text-sm">
                    {artist.name}
                </div>
            </div>
        </div>
    )
}