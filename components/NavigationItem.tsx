import { FC } from "react";
import { IconType } from "react-icons";
import Link from "next/link";

interface NavigationItemProps {
    icon: IconType;
    active?: boolean;
    href: string;
}

const NavigationItem: FC<NavigationItemProps> = ({
    icon: Icon,
    active,
    href,
}) => {
    return (
        <Link
            href={href}
            className={`${active ? "text-[#267BFA]" : ""} ${
                href === "/add-note" &&
                "bg-[#267BFA] p-3 text-white rounded-full mb-[70px] border-solid border-[10px] border-white md:mb-0 md:border-none md:text-black"
            } md:p-3 md:bg-white rounded-full`}
        >
            <Icon className="text-[26px] md:text-[30px]" />
        </Link>
    );
};

export default NavigationItem;
