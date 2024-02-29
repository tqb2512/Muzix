import AudioPlayer from "@/components/AudioPlayer";
import StoreProvider from "@/libs/StoreProvider";
import './globals.css'

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <div>
            {children}
          </div>
          <div className="fixed bottom-0 w-full p-4">
            <AudioPlayer />
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
