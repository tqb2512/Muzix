import { album} from "@prisma/client";
import TableItem from "@/components/ArtistContainer/AlbumTable/TableItem";
import Link from "next/link";
import React from "react";

interface AlbumTableProps {
    albums: album[];
}

export default function AlbumTable({ albums }: AlbumTableProps){

    const [numOfCols, setNumOfCols] = React.useState(6);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const renderItems = albums.map((album, index) => {
        if (index >= numOfCols)
            return null
        return <TableItem key={index} album={album} />
    })

    React.useEffect(() => {
        const handleResize = (entries: any) => {
            for (let entry of entries) {
                setNumOfCols(Math.floor(entry.contentRect.width / 208));
            }
        };

        const resizeObserver = new ResizeObserver(handleResize);

        const currentRef = containerRef.current;
        if (currentRef) {
            resizeObserver.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                resizeObserver.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="flex flex-col w-full h-full mt-6">
            <div className="flex flex-row justify-between items-center">
                <div className="text-2xl font-bold">Albums</div>
                <Link
                    href={``}
                    className="text-gray-text hover:underline font-bold"
                >Show all</Link>
            </div>

            <div
                className={`grid gap-4 mt-2`}
                style={{
                    gridTemplateColumns: `repeat(${numOfCols}, minmax(0, 1fr))`
                }}
            >
                {renderItems}
            </div>
        </div>
    )
}