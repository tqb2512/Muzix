import Link from "next/link";
import * as Icons from "./Icons";

interface NavigatorProps {
    title: string;
    link: string;
    icon: any
}

const navigators: NavigatorProps[] = [
    {
        title: "Home",
        link: "/",
        icon: Icons.HomeIcon
    },
    {
        title: "Search",
        link: "/search",
        icon: Icons.SearchIcon
    }
]

export default function NavigatorSection({ isExpanded = true }: { isExpanded?: boolean }) {
    return (
        <div className="rounded-lg bg-dark-background">
            {navigators.map((navigator, index) => (
                <Link href={navigator.link} key={index}
                    className="font-bold flex ml-2 items-center p-4 text-gray-button hover:text-white transition-all duration-300 ease-in-out"
                >
                    <navigator.icon className="w-7 h-7 mr-4 fill-current flex-shrink-0" />
                    {isExpanded && navigator.title}
                </Link>
            ))}
        </div>
    );
}