import { playlist } from "@prisma/client";
import PlaylistBox from "@/components/Container/Home/Section/Playlist";
interface PlaylistTableProps {
    playlists: playlist[];
}

export default function PlaylistTable({ playlists }: PlaylistTableProps) {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-row justify-between items-center">
                <div className="text-2xl font-bold">Playlists</div>
            </div>
            <div className="grid gap-4 mt-2">
                {playlists.map((playlist, index) => (
                    <PlaylistBox key={index} playlist={playlist} />
                ))}
            </div>
        </div>
    )

}