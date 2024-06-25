import SongContainer from "@/components/Container/Song";

export default function SongDetailPage({params}: { params: { song_id: string } }) {
    return (
        <div>
            <SongContainer song_id={params.song_id}/>
        </div>
    )
}