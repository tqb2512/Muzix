import AudioPlayer from "@/components/AudioPlayer";
import StoreProvider from "@/libs/StoreProvider";
import './globals.css'
import SideBar from "@/components/SideBar";
import MainPanel from "@/components/MainPanel";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
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
        </body>
      </html>
    </StoreProvider >
  );
}
