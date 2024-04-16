import { Result } from "@/app/api/search/route";
import { useEffect, useState } from "react";
import Image from "next/image";

interface TopResultBoxProps {
    searchResults: Result;
}

export default function TopResultBox({ searchResults }: TopResultBoxProps) {

    const [coverUrl, setCoverUrl] = useState<string>("");

    useEffect(() => {
        if (searchResults?.topResult?.type == "album" || searchResults?.topResult?.type == "song") {
            fetch(`/api/albums/cover?id=${searchResults.topResult.album_id}`)
                .then((res) => res.json())
                .then((data) => {
                    setCoverUrl(data.url);
                });
        } else if (searchResults?.topResult?.type === "playlist") {
            fetch(`/api/playlists/cover?id=${searchResults.topResult.playlist_id}`)
                .then((res) => res.json())
                .then((data) => {
                    setCoverUrl(data.url);
                });
        } else if (searchResults?.topResult?.type === "artist") {
            fetch(`/api/artists/cover?id=${searchResults.topResult.artist_id}`)
                .then((res) => res.json())
                .then((data) => {
                    setCoverUrl(data.url);
                });
        }
    }, [searchResults]);

    const renderTopResult = () => {
        switch (searchResults?.topResult?.type) {
            case "album":
                return (
                    <div className="h-full w-full p-6 flex flex-col justify-between">
                        <div className="size-32 rounded-md overflow-hidden relative shrink-0">
                            <Image src={coverUrl || "/next.svg"} alt="Album cover" fill sizes="128px"
                                className="object-cover" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold truncate">{searchResults.topResult?.name}</h1>
                            <h2 className="text-lg">Album&ensp; &bull; &ensp;{searchResults.topResult?.artist.name}</h2>
                        </div>
                    </div>
                )
            case "artist":
                return (
                    <div className="h-full w-full p-6 flex flex-col justify-between">

                        <div className="size-32 rounded-full overflow-hidden relative shrink-0">
                            <Image src={coverUrl || "/next.svg"} alt="Artist cover" fill sizes="128px"
                                className="object-cover" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold truncate">{searchResults.topResult?.name}</h1>
                            <h2 className="text-lg">Artist</h2>
                        </div>
                    </div>
                )
            case "playlist":
                return (
                    <div className="h-full w-full p-6 flex flex-col justify-between">

                        <div className="size-32 rounded-md overflow-hidden relative shrink-0">
                            <Image src={coverUrl || "/next.svg"} alt="Playlist cover" fill sizes="128px"
                                className="object-cover" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold truncate">{searchResults.topResult?.name}</h1>
                            <h2 className="text-lg">Playlist&ensp; &bull; &ensp;{searchResults.topResult?.user.username}</h2>
                        </div>
                    </div>
                )
            case "song":
                return (
                    <div className="h-full w-full p-6 flex flex-col justify-between">

                        <div className="size-32 rounded-md overflow-hidden relative shrink-0">
                            <Image src={coverUrl || "/next.svg"} alt="Song cover" fill sizes="128px"
                                className="object-cover" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold truncate">{searchResults.topResult?.name}</h1>
                            <div className="flex flex-row">
                                <h2 className="text-lg">Song&ensp; &bull; &ensp;</h2>
                                <h2 className="text-lg">{searchResults.topResult?.album.artist.name}</h2>
                                {searchResults.topResult?.artist_contribute_song.map((artist) => (
                                    <h2 className="text-lg" key={artist.artist.artist_id}>, {artist.artist.name}</h2>
                                ))}
                            </div>
                        </div>
                    </div>
                )
        }
    }

    return (
        <div className="mt-4 sm:w-full lg:w-[24rem] h-[15.5rem] rounded-lg bg-opacity-30 bg-hover-gray-background hover:bg-opacity-100">
            {renderTopResult()}
        </div>
    )
}