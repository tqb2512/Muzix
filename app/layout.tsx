import StoreProvider from "@/libs/StoreProvider";
import './globals.css'

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <StoreProvider>
            <html lang="en">
                <body>
                    {children}
                </body>
            </html>
        </StoreProvider >
    );
}
