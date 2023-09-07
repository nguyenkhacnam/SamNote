"use client";

import { usePathname } from "next/navigation";
import { FC, useMemo } from "react";
import { CiStickyNote } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { BsPlusLg } from "react-icons/bs";
import { PiMessengerLogoLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { CiCircleQuestion } from "react-icons/ci";
import NavigationItem from "./NavigationItem";
import Link from "next/link";
import { IoIosAddCircleOutline } from "react-icons/io";

interface NavigationProps {
    children: React.ReactNode;
}

const Navigation: FC<NavigationProps> = ({ children }) => {
    const pathName = usePathname();
    const routes = useMemo(
        () => [
            {
                icon: CiStickyNote,
                active: pathName === "/",
                href: "/",
            },
            {
                icon: CiCalendarDate,
                active: pathName === "/schedule",
                href: "/schedule",
            },
            {
                icon: BsPlusLg,
                active: pathName === "/add-note",
                href: "/add-note",
            },
            {
                icon: PiMessengerLogoLight,
                active: pathName === "/chat",
                href: "/chat",
            },
            {
                icon: CiUser,
                active: pathName === "/user-profile",
                href: "/user-profile",
            },
        ],
        [pathName]
    );

    return (
        <div className="md:flex w-full h-full px-[23px] py-[13px] md:px-[25px] md:py-[38px] bg-[#F7F7F7] md:bg-white">
            <div className="md:flex md:items-center md:flex-col md:justify-between  md:sticky md:top-[38px] md:left-0 md:h-[calc(100vh-80px)] md:w-max md:bg-[#8AC3FC] rounded-[20px]">
                <div className="flex items-center justify-between md:flex-col md:gap-10 fixed bottom-[13px] left-0 bg-[white] h-[68px] w-full px-[18px] py-[20px] rounded-[20px] md:sticky md:bottom-0 md:w-max md:bg-[#8AC3FC]">
                    {routes.map((item, index) => (
                        <NavigationItem key={index} {...item} />
                    ))}
                </div>

                <Link
                    href="/about"
                    className={`hidden md:block pb-[40px] ${
                        pathName === "/about"
                            ? "md:text-[#267BFA]"
                            : "md:text-white"
                    }`}
                >
                    <CiCircleQuestion className="md:text-[40px]" />
                </Link>
            </div>
            <main className="w-full">{children}</main>
        </div>
    );
};

export default Navigation;
