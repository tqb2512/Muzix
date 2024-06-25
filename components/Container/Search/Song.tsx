import {Song} from "@/app/api/search/route"
import * as albumsAPI from "@/libs/Redux/features/apiSlices/albums"
import Image from "next/image";
import Link from "next/link";
import * as queue from "@/libs/Redux/features/slices/queue";
import {useDispatch} from "react-redux";

interface SongBoxProps {
    song: Song;
}

export default function SongBox({song}: SongBoxProps) {

    const dispatch = useDispatch();
    const {data: coverUrl} = albumsAPI.useGetCoverByIdQuery(song.album_id);

    const handlePlay = () => {
        dispatch(queue.shift());
        dispatch(queue.play(song));
    }

    return (
        <div
            onDoubleClick={handlePlay}
            className="h-[3.5rem] w-full rounded-md hover:bg-hover-gray-background p-2 flex justify-between items-center">
            <div className="h-full w-full flex flex-row space-x-2 items-center">
                <div className="size-[2.5rem] rounded-md overflow-hidden relative shrink-0">
                    <Image src={coverUrl?.url || "/next.svg"} alt="Album cover" fill sizes="40px"
                           className="object-cover"/>
                </div>
                <div className="flex flex-col">
                    <Link className="text-gray-text hover:text-white hover:underline" href={`/app/song/${song.song_id}`}>
                        {song.name}
                    </Link>
                    <div className="flex flex-row">
                        <Link
                            className="text-gray-text hover:text-white hover:underline"
                            href={`/app/artist/${song.album.artist.artist_id}`}>{song.album.artist.name}</Link>
                        {song.artist_contribute_song.map((artist) => (
                            <Link
                                className="text-gray-text hover:text-white hover:underline"
                                href={`/app/artist/${artist.artist.artist_id}`}
                                key={artist.artist.artist_id}>, {artist.artist.name}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}