import {album} from "@prisma/client";

interface AlbumProps {
    album: album;
}
export default function AlbumBox({ album }: AlbumProps) {
    return (
        <div className="h-12 rounded-lg hover:border-b-hover-gray-background">
        </div>
    )
}