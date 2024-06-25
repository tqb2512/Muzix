import {album, artist, artist_contribute_song, playlist_song, song} from "@prisma/client";
import Item from "./Item";
import * as Icons from "../Icons";

export interface Song extends song {
    playlist_song: playlist_song[];
    album: album & {
        artist: artist;
    };
    artist_contribute_song: artist_contribute_song & {
        artist: artist;
    }[];
}

interface ListTableProps {
    playlist_id: string;
    songs: Song[];
}

export default function ListTable({songs, playlist_id}: ListTableProps) {
    return (
        <div className="w-full">
            <div
                className="flex items-center sticky justify-between top-0 z-10 text-gray-text h-14 border-b border-zinc-700 mb-2">
                <div className="text-center w-12">#</div>
                <div className="w-full flex justify-between">
                    <div className="text-left w-full">Title</div>
                    <div className="text-left w-2/5">Album</div>
                    <div className="text-left w-1/4">Date added</div>
                </div>
                <div className="flex items-center justify-center w-32">
                    <Icons.Duration className="w-5 h-5 fill-current text-gray-text"/>
                </div>
                <div className="w-12"/>
            </div>
            <div className="space-y-2">
                {songs.map((song, index) => (
                    <Item playlist_id={playlist_id} key={song.song_id} song={song} index={index}/>
                ))}
            </div>
        </div>
    )
}