import InfoButton from "./Buttons/Info";
import LyricsButton from "./Buttons/Lyrics";
import QueueButton from "./Buttons/Queue";
import VolumeBar from "./VolumeBar";
import Link from "next/link";

export default function RightBar({ audioRef }: { audioRef: any }) {
    return (
        <div className="flex items-center w-3/12 space-x-4 justify-end">
            <div className="flex justify-end w-1/2 flex-grow">
                <div className="flex items-center space-x-4">
                    <InfoButton className="w-4 h-4 fill-current text-gray-300 hover:text-white flex-shrink-0" />
                    <LyricsButton className="w-4 h-4 fill-current text-gray-300 hover:text-white flex-shrink-0" />
                    <Link href="/queue">
                        <QueueButton className="w-4 h-4 fill-current text-gray-300 hover:text-white flex-shrink-0" />
                    </Link>
                </div>
                <VolumeBar audioRef={audioRef} />
            </div>
        </div >
    )
}