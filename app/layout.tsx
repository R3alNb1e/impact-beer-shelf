import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Beer Collection App",
    description: "Catalog your growing beer collection.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col`}>
        {/*add a global Navbar and Footer here later */}
        {/* <Navbar /> */}
        <div className="flex-grow">
            {children}
        </div>
        {/* <Footer /> */}
        </body>
        </html>
    );
}