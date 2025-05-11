import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: "My Beer Collection",
    description: "An awesome collection of beers.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} font-sans`}>
            <body
                className={`flex h-screen bg-beer-timberwolf text-beer-cafe-noir dark:bg-beer-cafe-noir dark:text-beer-timberwolf antialiased`}
            >
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-y-auto">
                    {children}
                </div>
            </body>
        </html>
    );
}