import HomeContainer from "@/components/Container/Home";
import Link from "next/link";

export default function HomePage() {
    return (
        <div>
            <HomeContainer/>
            <div className="sticky bottom-0 p-4 text-white text-center bg-green-500">
                <Link href="/signup" className="hover:underline">
                    Subscribe to enjoy unlimited access to millions of songs
                </Link>
            </div>
        </div>
    );
}