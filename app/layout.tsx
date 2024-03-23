import StoreProvider from "@/libs/StoreProvider";
import './globals.css'
import SupabaseProvider from "@/libs/SupabaseProvider";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <StoreProvider>
            <SupabaseProvider>
                <html lang="en">
                    <body>
                        {children}
                    </body>
                </html>
            </SupabaseProvider>
        </StoreProvider >
    );
}
