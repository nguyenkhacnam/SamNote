"use client";

import { Providers } from "@/redux/provider";
import "./globals.css";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import { usePathname } from "next/navigation";
import StyledComponentsRegistry from "./lib/AntdRegistry";

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
                    <StyledComponentsRegistry>
                        {pathName === "/login" ||
                        pathName === "/signup" ||
                        pathName === "/add-note" ||
                        pathName === `/notes/:id` ? (
                            children
                        ) : (
                            <Navigation>{children}</Navigation>
                        )}
                    </StyledComponentsRegistry>
                </Providers>
            </body>
        </html>
    );
}
