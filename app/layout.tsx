"use client";

import { Providers } from "@/redux/provider";
import "./globals.css";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
    title: "SamNote",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathName = usePathname();
    return (
        <html lang="en">
            <body>
                <Providers>
                    {pathName === "/login" ? (
                        children
                    ) : (
                        <Navigation>{children}</Navigation>
                    )}
                </Providers>
            </body>
        </html>
    );
}
