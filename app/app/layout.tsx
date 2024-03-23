import AudioPlayer from "@/components/AudioPlayer";
import SideBar from "@/components/SideBar";
import MainPanel from "@/components/MainPanel";
import { readUserSession } from "@/utils/supabase/actions";
import { redirect } from "next/navigation";

export default async function AppLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const { data } = await readUserSession();

    if (!data.session) {
        return redirect("/");
    }
    
    return (
        <div className="flex h-screen w-screen">
            <div className="h-[calc(100vh-75px)] flex w-full">
                <SideBar />
                <div className="pr-2 pb-2 pt-2 w-full">
                    <MainPanel>
                        {children}
                    </MainPanel>
                </div>
            </div>
            <AudioPlayer className="fixed bottom-0 w-full pt-1 pl-2 pr-2 h-[75px]" />
        </div>
    );
}
