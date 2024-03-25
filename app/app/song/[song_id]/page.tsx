import SongContainer from "@/components/SongContainer";

export default function SongDetailPage({ params }: { params: { song_id: string } }) {
    return (
        <div>
            <SongContainer song_id={params.song_id} />
        </div>
    )
}