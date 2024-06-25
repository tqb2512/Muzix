import * as Icons from "./Icons";
import VolumeBar from "./VolumeBar";
import Link from "next/link";
import {useSelector} from "react-redux";
import {RootState} from "@/libs/Redux/store";

export default function RightBar({audioRef}: { audioRef: any }) {
    const playerState = useSelector((state: RootState) => state.player);
    return (
        <div className="flex items-center w-3/12 space-x-4 justify-end">
            <div className="flex justify-end w-1/2 flex-grow">
                <div className="flex items-center space-x-4">
                    {playerState.song.song_id && (
                        <Link href={`/app/song/${playerState.song.song_id}`}>
                            <Icons.Info className="w-4 h-4 fill-current text-gray-300 hover:text-white flex-shrink-0"/>
                        </Link>
                    )}
                    {playerState.song.song_id && (
                        <Link href="/app/lyrics">
                            <Icons.Lyrics
                                className="w-4 h-4 fill-current text-gray-300 hover:text-white flex-shrink-0"/>
                        </Link>
                    )}
                    <Link href="/app/queue">
                        <Icons.Queue className="w-4 h-4 fill-current text-gray-300 hover:text-white flex-shrink-0"/>
                    </Link>
                </div>
                <VolumeBar audioRef={audioRef}/>
            </div>
        </div>
    )
}