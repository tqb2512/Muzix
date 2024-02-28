import AudioPlayer from "@/components/AudioPlayer";
import StoreProvider from "@/libs/StoreProvider";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          {children}
          <AudioPlayer />
        </body>
      </html>
    </StoreProvider>
  );
}
