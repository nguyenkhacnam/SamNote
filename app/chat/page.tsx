import Header from "@/components/Header";
import { FC } from "react";
import { CiSearch, CiMenuBurger, CiImageOn } from "react-icons/ci";
import { TfiMenuAlt, TfiHeart } from "react-icons/tfi";
import onl from "../../assets/images/onl.png";
import avaOnl from "../../assets/images/avaOnl.png";
import "./chat.css"

import Image from "next/image";


const Chat = () => {
    return (
        <>
            <div className="h-screen md:h-full w-full md:px-4 md:py-2 lg:px-12 lg:py-4">
                <Header/>
            
                <div className="inline-block w-[100%] sm:grid sm:grid-cols-3 xl:grid-cols-4 gap-4 pt-8 ">
                    <div className="col-span-1 bg-gray-300 p-10 lg:mr-8 rounded-[30px] h-[calc(100vh)] sm:h-[calc(80vh)] ">
                        
                        <div className="relative w-[100%]">
                            <input
                                type="text"
                                placeholder="Search"
                                className="p-3 pl-12 pr-10 w-[100%] placeholder:text-[black] placeholder:text-[16px] rounded-[50px] shadow-md"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <CiSearch className="text-[26px]" />
                            </div>
                        </div>

                        <div className="overflow-y-auto w-[100%] h-[90%] mt-8 section">

                            <div className="flex items-center pl-8 mb-8 cursor-pointer">
                                <div className="sm:col-span-1 w-[50px] h-[50px] rounded-full bg-black relative">
                                    <Image
                                        src={avaOnl}
                                        alt=""
                                        className="rounded-full "
                                    />
                                    <Image
                                        src={onl}
                                        alt=""
                                        className="absolute right-0 bottom-0"
                                    />
                                </div>
                                <div className="pl-6">
                                    <p className="text-[18px] font-medium">Nguyễn Văn A</p>
                                    <p className="text-[14px] ">A sent a photo. 9:45</p>
                                </div>
                            </div>
                        
                        </div>
                    </div>

                    <div className="col-span-2 xl:col-span-3 bg-gray-300 p-12 rounded-[30px] h-[80vh] mb-32 mt-4 sm:mb-0 sm:mt-0 ">
                        <div className="flex justify-between items-center pt-4 pb-4 pl-2 pr-2 lg:pl-16 lg:pr-12 bg-white rounded-[20px]">
                            <p className="text-[24px] font-medium">Nguyễn Văn A</p>
                            <div className="flex">
                                <CiSearch className="text-[26px] mr-2 lg:mr-10"/>
                                <TfiMenuAlt className="text-[26px]"/> 
                            </div>
                        </div>

                        <div className="h-[72%] bg-orange-200">

                        </div>

                        <div className="flex justify-between items-center pt-3 pb-3 pl-1 pr-1 lg:pl-16 lg:pr-12 bg-white rounded-[20px]">
                            <div className="flex">
                                <CiMenuBurger className="text-[26px] text-blue-600 mr-2 lg:mr-8"/>
                                <CiImageOn className="text-[26px] text-blue-600"/> 
                            </div>
                            <div className="flex w-[80%] lg:w-[65%] items-center pr-1 lg:pr-14">
                                <input type="text" className="w-full p-4 pl-8 bg-gray-200 rounded-[20px] outline-none mr-1 lg:mr-10" placeholder="Messaging" />
                                <TfiHeart className="text-[26px] text-blue-600"/> 
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Chat;
