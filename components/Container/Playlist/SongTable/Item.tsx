import Image from "next/image";
import {Song} from "./index";
import * as albumsAPI from "@/libs/Redux/features/apiSlices/albums";
import * as playlistsAPI from "@/libs/Redux/features/apiSlices/playlists";
import * as usersAPI from "@/libs/Redux/features/apiSlices/users";
import * as queue from "@/libs/Redux/features/slices/queue";
import {RootState} from "@/libs/Redux/store";
import {useDispatch, useSelector} from "react-redux";
import * as Icons from "../Icons";
import Link from "next/link";
import {toMMSS} from "@/components/AudioPlayer";

interface ListItemProps {
    playlist_id: string;
    song: Song;
    index: number;
}

export default function Item({song, index, playlist_id}: ListItemProps) {

    const dispatch = useDispatch();
    const {data: coverUrl} = albumsAPI.useGetCoverByIdQuery(song.album_id);
    const {refetch: refetchSongs} = playlistsAPI.useGetSongsByIdQuery(playlist_id);
    const playerState = useSelector((state: RootState) => state.player);
    const user = useSelector((state: RootState) => state.user);
    const {refetch: refetchUser} = usersAPI.useGetUserByIdQuery(user.user_id);
    const [sendAction] = usersAPI.useSendActionMutation();

    const handlePlay = () => {
        dispatch(queue.shift());
        dispatch(queue.play(song));
    }

    return (
        <div
            onDoubleClick={handlePlay}
            key={song.song_id}
            className="flex items-center justify-between h-14 rounded-md hover:bg-hover-gray-background text-gray-text hover:!text-white">
            <div
                className={`text-center w-12` + (playerState.song?.song_id === song.song_id ? " text-green-500" : "")}>{index + 1}</div>
            <div className="w-full flex justify-between">
                <div className="text-left w-full flex space-x-3 h-full items-center">
                    <div className="rounded-md h-10 w-10 overflow-hidden relative shrink-0">
                        <Image src={coverUrl?.url || "/next.svg"} alt="Album cover" fill sizes="40px"
                               className="object-cover"/>
                    </div>

                    <div className="flex flex-col justify-center w-4/5">
                        <div>
                            <Link href={`/app/song/${song.song_id}`}
                                  className={`truncate overflow-hidden hover:underline` + (playerState.song?.song_id === song.song_id ? " text-green-500" : "")}>
                                {song.name}
                            </Link>
                        </div>
                        <div className="text-sm truncate overflow-hidden">
                            <Link href={`app/artist/${song.album.artist.artist_id}`}
                                  className="hover:underline">{song.album.artist.name}</Link>
                            {song.artist_contribute_song.map((artist) => (
                                <Link href={`app/artist/${artist.artist.artist_id}`} className="hover:underline"
                                      key={artist.artist.artist_id}>, {artist.artist.name}</Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col overflow-hidden w-2/5 justify-center">
                    <Link href={`/app/album/${song.album_id}`}
                          className="text-left truncate hover:underline">{song.album.name}</Link>
                </div>
                <div className="flex flex-col overflow-hidden w-1/4 justify-center">
                    <h1 className="text-left truncate">{new Date(song.playlist_song[0].created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    })}</h1>
                </div>
            </div>

            <div className="text-center w-32 truncate overflow-hidden ">{toMMSS(song.duration_ms)}</div>
            <div className="w-12">
                <div onClick={() => {
                    document.getElementById(`song-dropdown-${index}`)?.classList.toggle("hidden");
                }}>
                    <Icons.ThreeDots className="w-6 h-6 fill-current"/>
                </div>
                <div
                    id={`song-dropdown-${index}`}
                    className="z-50 hidden bg-neutral-800 rounded-md w-48 absolute right-12 p-1">
                    <div className="flex flex-col justify-between w-full">
                        <button
                            onClick={() => {
                                dispatch(queue.push(song));
                            }}
                            className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
                            <h1>Add to queue</h1>
                        </button>
                        {user?.playlist?.find((playlist) => playlist.playlist_id === playlist_id) &&
                            <button
                                onClick={() => {
                                    sendAction({
                                        user_id: user.user_id,
                                        action: "remove",
                                        type: "song",
                                        id: song.song_id,
                                        query_playlist_id: playlist_id
                                    });
                                    refetchSongs();
                                }}
                                className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
                                <h1>Remove</h1>
                            </button>}
                        <button
                            onClick={() => {
                                sendAction({
                                    user_id: user.user_id,
                                    action: user?.user_like_song?.find((like) => like.song.song_id === song.song_id) ? "unlike" : "like",
                                    type: "song",
                                    id: song.song_id,
                                });
                                refetchUser();
                            }}
                            className="h-10 w-full hover:bg-neutral-700 rounded-sm flex items-center p-2">
                            <h1>{user?.user_like_song?.find((like) => like.song.song_id === song.song_id) ? "Unlike" : "Like"}</h1>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}