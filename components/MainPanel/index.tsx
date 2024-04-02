import Navbar from "./Navbar";

export default function MainPanel({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="rounded-lg bg-dark-background h-full w-full">
            <div className="flex flex-col h-full">
                <Navbar />
                <div className="pr-6 pl-6 h-full overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}