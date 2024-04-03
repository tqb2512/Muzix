import AlbumContainer from "@/components/Container/Album";

export default function AlbumDetailPage({ params }: { params: { album_id: string } }) {

    return (
        <div>
            <AlbumContainer album_id={params.album_id} />
        </div>
    )
}