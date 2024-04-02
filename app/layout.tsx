import StoreProvider from "@/libs/StoreProvider";
import './globals.css'
import SupabaseProvider from "@/libs/SupabaseProvider";

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className="overflow-x-hidden">
        <StoreProvider>
            <SupabaseProvider>
                {children}
            </SupabaseProvider>
        </StoreProvider>
        </body>
        </html>
    );
}
