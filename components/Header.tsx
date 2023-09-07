import { FC } from "react";
import { CiSearch } from "react-icons/ci";
import { BsPlusLg } from "react-icons/bs";
import Link from "next/link";
import { useSelector } from "react-redux";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
    return (
        <div className="flex items-center justify-between md:gap-5 w-full">
            <div className="hidden md:flex items-center shadow-md rounded-[50px] overflow-hidden lg:w-[300px] xl:w-[384px]">
                <div className="pl-3">
                    <CiSearch className="text-[26px]  " />
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    className="p-3 outline-none placeholder:text-[black] placeholder:text-[15px]"
                />
            </div>
            <div className="p-3 bg-[#EFEFEF] w-max rounded-full md:hidden">
                <CiSearch className="text-[26px]  " />
            </div>
            <div className="flex items-center gap-2 md:gap-3 lg:gap-6 xl:gap-[42px]">
                <div className="hidden md:flex p-3 bg-[#EFEFEF] w-max rounded-full">
                    <BsPlusLg className="text-[26px]  " />
                </div>
                <Link href="/login">
                    <p className="md:py-[10px] px-[20px] py-[6px] md:px-[26px] lg:px-[46px] bg-[#D9D9D9] md:text-[16px] text-[13px] font-medium w-max rounded-[12px]">
                        Login
                    </p>
                </Link>
                <Link href="/signup">
                    <p className="md:py-[10px] px-[20px] py-[6px] md:px-[26px] lg:px-[46px] bg-[#D9D9D9] md:text-[16px] text-[13px] font-medium w-max rounded-[12px]">
                        Sign up
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Header;
