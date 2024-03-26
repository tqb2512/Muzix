import { song, album, artist, artist_contribute_song } from "@prisma/client";
import * as albumsAPI from "@/libs/features/apiSlices/albums";
import Image from "next/image";
import Link from "next/link";
import * as queue from "@/libs/features/slices/queue";
import { useDispatch } from "react-redux";

interface Song extends song {
    album: album & {
        artist: artist;
    };
    artist_contribute_song: artist_contribute_song & {
        artist: artist;
    }[];
}

export default function SongCard({ song, index }: { song: Song, index: number }) {

    const dispatch = useDispatch();
    const { data: albumCoverUrl } = albumsAPI.useGetCoverByIdQuery(song.album.album_id);

    const handleDoubleClick = () => {
        dispatch(queue.playAtIndex(index));
    }

    return (
        <div>
            {index === 0 && (
                <h1 className="text-sm font-bold text-gray-button mt-4">
                    Now playing
                </h1>)}
            {index === 1 && (
                <h1 className="text-sm font-bold text-gray-button mt-4">
                    Next in queue
                </h1>)}
            <div
                onDoubleClick={handleDoubleClick}
                className="flex justify-between items-center mt-2 rounded-md p-2 hover:bg-hover-gray-background hover:text-white text-gray-text">
                <div className="flex items-center space-x-5 w-1/2 ml-4">
                    <div className={`${index === 0 ? "text-green-500" : "text-gray-text"}`}>
                        {index + 1}
                    </div>
                    <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                            <Image src={albumCoverUrl?.url || "/next.svg"} alt="Album cover" width={40} height={40} className="rounded-md flex-shrink-0" />
                        </div>

                        <div className="flex flex-col justify-between">
                            <div className={`${index === 0 ? "text-green-500" : "text-white"} overflow-hidden truncate`}>
                                {song?.name}
                            </div>
                            <div className="text-xs">
                                <Link
                                    href={`/artists/${song?.album.artist.artist_id}`}
                                    className="hover:text-white hover:underline"
                                >
                                    {song?.album.artist.name}
                                </Link>
                                {song?.artist_contribute_song.map((artist) => {
                                    return (
                                        <Link key={artist.artist.artist_id} href={`/artists/${artist.artist.artist_id}`} className="hover:text-white hover:underline">
                                            <span>, {artist.artist.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>
                <Link href="" className="w-1/4 overflow-hidden truncate hover:underline">
                    {song.album.name}
                </Link>
                <div className="w-1/12 ">
                    {song.duration_ms}
                </div>
            </div>
        </div>
    )
}