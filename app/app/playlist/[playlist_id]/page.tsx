import PlaylistContainer from "@/components/Container/Playlist"
export default function PlaylistDetailPage({ params }: { params: { playlist_id: string } }) {
    return (
        <div>
            <PlaylistContainer playlist_id={params.playlist_id} />
        </div>
    )
}