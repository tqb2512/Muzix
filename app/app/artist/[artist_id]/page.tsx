import ArtistContainer from "@/components/ArtistContainer";

export default function ArtistPage({ params }: { params: { artist_id: string } }) {
    return (
        <div>
            <ArtistContainer artist_id={params.artist_id} />
        </div>
    )
}