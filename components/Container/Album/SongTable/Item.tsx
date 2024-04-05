import Image from "next/image";
import {Song} from "./index";
import * as albumsAPI from "@/libs/Redux/features/apiSlices/albums";
import * as queue from "@/libs/Redux/features/slices/queue";
import {RootState} from "@/libs/Redux/store";
import {useDispatch, useSelector} from "react-redux";
import * as Icons from "../Icons";
import Link from "next/link";

interface ListItemProps {
    song: Song;
    index: number;
}

export default function ListItem({ song, index }: ListItemProps) {

    const dispatch = useDispatch();
    const { data: coverUrl } = albumsAPI.useGetCoverByIdQuery(song.album_id);
    const playerState = useSelector((state: RootState) => state.player);

    const handlePlay = () => {
        dispatch(queue.shift());
        dispatch(queue.play(song));
    }

    return (
        <div
            onDoubleClick={handlePlay}
            key={song.song_id} className="flex items-center justify-between h-14 rounded-md hover:bg-hover-gray-background text-gray-text hover:!text-white">
            <div className={`text-center w-12` + (playerState.song?.song_id === song.song_id ? " text-green-500" : "")}>{index + 1}</div>
            <div className="w-full flex justify-between">
                <div className="text-left w-full flex space-x-3 h-10">
                    <div className="rounded-md h-10 w-10 overflow-hidden relative shrink-0">
                        <Image src={coverUrl?.url || "/next.svg"} alt="Album cover" fill sizes="40px" className="object-cover" />
                    </div>

                    <div className="flex flex-col justify-center w-4/5">
                        <div>
                            <Link href={`/app/song/${song.song_id}`} className={`truncate overflow-hidden hover:underline` + (playerState.song?.song_id === song.song_id ? " text-green-500" : "")}>
                                {song.name}
                            </Link>
                        </div>
                        <div className="text-sm truncate overflow-hidden">
                            <Link href={`/app/artist/${song.album.artist.artist_id}`} className="hover:underline">{song.album.artist.name}</Link>
                            {song.artist_contribute_song.map((artist) => (
                                <Link href={`/app/artist/${artist.artist.artist_id}`} className="hover:underline" key={artist.artist.artist_id}>, {artist.artist.name}</Link>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
            <div className="text-center w-32 truncate overflow-hidden">{song.duration_ms}</div>
            <div className="w-12">
                <Icons.ThreeDots className="w-6 h-6 fill-current" />
            </div>
        </div>
    )
}