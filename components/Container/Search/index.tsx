"use client";
import {useEffect, useState} from "react";
import {RootState} from "@/libs/Redux/store";
import {useSelector} from "react-redux";
import {Result} from "@/app/api/search/route";
import TopResultBox from "./TopResult";
import ArtistBox from "../Home/Section/Artist";
import AlbumBox from "../Home/Section/Album";
import PlaylistBox from "../Home/Section/Playlist";
import SongBox from "./Song";

export default function SearchContainer() {

    const user = useSelector((state: RootState) => state.user);
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Result>({} as Result);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 700);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    useEffect(() => {
        if (debouncedSearch) {
            fetch(`/api/search?query=${debouncedSearch}&userId=${user.user_id}`)
                .then((res) => res.json())
                .then((data) => {
                    setSearchResults(data.Result);
                });
        }
    }, [debouncedSearch, user.user_id]);

    return (
        <div className="px-6">
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text" placeholder="What do you want to play?"
                className="w-1/4 h-9 p-2 rounded-md absolute top-6 ml-24 z-50 bg-hover-gray-background"/>
            {!search ? (
                <div className="mt-4">
                    <h1 className="text-2xl font-bold">Recent searches</h1>
                </div>
            ) : (
                <div className="mt-4">
                    <div className="flex sm:flex-col lg:flex-row lg:space-x-4">
                        <div className="">
                            <h1 className="text-2xl font-bold">Top result</h1>
                            <TopResultBox searchResults={searchResults}/>
                        </div>
                        <div className="w-full">
                            <h1 className="text-2xl font-bold">Songs</h1>
                            <div className="mt-4 space-y-2">
                                {searchResults?.songs?.slice(0, 4).map((song) => (
                                    <SongBox key={song.song_id} song={song}/>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col space-y-10">
                        {searchResults?.artists?.length > 0 && (
                            <div>
                                <h1 className="text-2xl font-bold">Artists</h1>
                                <div className="mt-2 grid grid-cols-6 gap-4">
                                    {searchResults?.artists?.map((artist) => (
                                        <ArtistBox key={artist.artist_id} artist={artist}/>
                                    ))}
                                </div>
                            </div>
                        )}
                        {searchResults?.albums?.length > 0 && (
                            <div>
                                <h1 className="text-2xl font-bold">Albums</h1>
                                <div className="mt-2 grid grid-cols-6 gap-4">
                                    {searchResults?.albums?.map((album) => (
                                        <AlbumBox key={album.album_id} album={album} artist={album.artist}/>
                                    ))}
                                </div>
                            </div>
                        )}
                        {searchResults?.playlists?.length > 0 && (
                            <div>
                                <h1 className="text-2xl font-bold">Playlists</h1>
                                <div className="mt-2 grid grid-cols-6 gap-4">
                                    {searchResults?.playlists?.map((playlist) => (
                                        <PlaylistBox key={playlist.playlist_id} playlist={playlist}/>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}