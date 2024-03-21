import * as Icons from "./Icons";
import VolumeBar from "./VolumeBar";
import Link from "next/link";

export default function RightBar({ audioRef }: { audioRef: any }) {
    return (
        <div className="flex items-center w-3/12 space-x-4 justify-end">
            <div className="flex justify-end w-1/2 flex-grow">
                <div className="flex items-center space-x-4">
                    <Icons.Info className="w-4 h-4 fill-current text-gray-300 hover:text-white flex-shrink-0" />
                    <Icons.Lyrics className="w-4 h-4 fill-current text-gray-300 hover:text-white flex-shrink-0" />
                    <Link href="/app/queue">
                        <Icons.Queue className="w-4 h-4 fill-current text-gray-300 hover:text-white flex-shrink-0" />
                    </Link>
                </div>
                <VolumeBar audioRef={audioRef} />
            </div>
        </div >
    )
}