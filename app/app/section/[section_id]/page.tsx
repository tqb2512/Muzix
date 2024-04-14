import SectionContainer from "@/components/Container/Section";

export default function SectionDetailPage({ params }: { params: { section_id: string } }) {
    return (
        <div>
            <SectionContainer section_id={params.section_id} />
        </div>
    )
}