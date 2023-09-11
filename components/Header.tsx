"use client";

import { FC } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { BsMenuButtonWide } from "react-icons/bs";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsGrid } from "react-icons/bs";
import { BsListUl } from "react-icons/bs";
import { BsSortDown } from "react-icons/bs";
import { BsSortAlphaDown } from "react-icons/bs";
import { useSelector } from "react-redux";

interface HeaderProps {
    user: any;
    num_notes: number;
    // setDisplayState: any;
}

const Header: FC<HeaderProps> = ({ user, num_notes }) => {
    return (
        <div className="flex items-center justify-between md:gap-5 w-full">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3 px-2 py-1 bg-[#267BFA] rounded-[50px] w-max pr-[80px] shadow-md">
                    <div>
                        <img
                            src={user?.AvtProfile}
                            className="w-[40px] h-[40px] rounded-full"
                            alt="avatar"
                        />
                    </div>
                    <div className="flex flex-col text-white">
                        <p
                            suppressHydrationWarning
                            className="text-[16px] md:text-[20px] lg:text-[26px] xl:text-[30px] font-medium"
                        >
                            {user?.name}
                        </p>

                        <p className="text-[12px] md:text-[14px] lg:text-[20px] xl:text-[24px]">
                            {num_notes} notes
                        </p>
                    </div>
                </div>
                <div className=" flex items-center justify-end gap-2">
                    <div className="p-3 bg-[#EFEFEF] w-max rounded-full md:hidden  shadow-md">
                        <FiSearch className="text-[26px]  " />
                    </div>
                    <div className="hidden md:flex items-center shadow-md rounded-[50px] overflow-hidden lg:w-[300px] xl:w-[384px]">
                        <div className="pl-3">
                            <FiSearch className="text-[26px]  " />
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="p-3 outline-none placeholder:text-[black] placeholder:text-[15px] "
                        />
                    </div>

                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="p-3 bg-[#EFEFEF] w-max rounded-full  shadow-md">
                                <BsMenuButtonWide className="text-[26px]  " />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-[30px] bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="p-3">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${
                                                    active
                                                        ? "bg-[#267BFA] text-white"
                                                        : "text-gray-900"
                                                } group flex w-full items-center rounded-[30px] px-2 py-2 text-sm font-medium`}
                                            >
                                                {active ? (
                                                    <BsGrid
                                                        className="mr-4 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <BsGrid
                                                        className="mr-4 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                Grid
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${
                                                    active
                                                        ? "bg-[#267BFA] text-white"
                                                        : "text-gray-900"
                                                } group flex w-full items-center rounded-[30px] px-2 py-2 text-sm font-medium`}
                                            >
                                                {active ? (
                                                    <BsListUl
                                                        className="mr-4 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <BsListUl
                                                        className="mr-4 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                List
                                            </button>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${
                                                    active
                                                        ? "bg-[#267BFA] text-white"
                                                        : "text-gray-900"
                                                } group flex w-full items-center rounded-[30px] px-2 py-2 text-sm font-medium`}
                                            >
                                                {active ? (
                                                    <BsSortDown
                                                        className="mr-4 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <BsSortDown
                                                        className="mr-4 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                Sort by date
                                            </button>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${
                                                    active
                                                        ? "bg-[#267BFA] text-white"
                                                        : "text-gray-900"
                                                } group flex w-full items-center rounded-[30px] px-2 py-2 text-sm font-medium`}
                                            >
                                                {active ? (
                                                    <BsSortAlphaDown
                                                        className="mr-4 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <BsSortAlphaDown
                                                        className="mr-4 h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                Sort by alphabet
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 lg:gap-6 xl:gap-[42px]">
                <div
                    className={`${user ? "hidden" : "flex items-center gap-2"}`}
                >
                    <Link href="/login">
                        <p className="md:py-[10px] px-[20px] py-[6px] md:px-[26px] lg:px-[46px] bg-[#D9D9D9] hover:bg-[#ece6e6] md:text-[16px] text-[13px] font-medium w-max rounded-[12px] shadow-md">
                            Login
                        </p>
                    </Link>
                    <Link href="/signup">
                        <p className="md:py-[10px] px-[20px] py-[6px] md:px-[26px] lg:px-[46px] bg-[#D9D9D9] hover:bg-[#ece6e6] md:text-[16px] text-[13px] font-medium w-max rounded-[12px] shadow-md">
                            Sign up
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
