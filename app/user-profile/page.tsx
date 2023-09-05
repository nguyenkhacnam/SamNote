"use client";
import Header from "@/components/Header";
import { FC, useState } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
    const [activeTab, setActiveTab] = useState("");

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };
    
    return (
        <>
        <div className="h-screen md:h-full w-full md:px-4 md:py-2 lg:px-12 lg:py-4">
            <Header/>

            <div className="grid grid-cols-4 gap-4 pt-12">
                <div className="col-span-1 bg-gray-300 p-10 rounded-[30px] h-[calc(70vh)]">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1 bg-red-600 w-[100px] h-[100px] rounded-full">
                            <img src="" alt="" />
                        </div>
                        <div className="col-span-2 text-[24px] font-semibold">
                            Full Name
                        </div>
                    </div>
                    <div className="pt-12 h-[60%]">
                        <ul className="h-[100%] grid">
                            <li className={activeTab === "edit-profile" ? "text-blue-500" : ""}>
                                <a href="#edit-profile" className="font-semibold text-[20px]" onClick={() => handleTabClick("edit-profile")}>Edit profile</a>
                            </li>
                            <li className={activeTab === "setting" ? "text-blue-500" : ""}>
                                <a href="#setting" className="font-semibold text-[20px]" onClick={() => handleTabClick("setting")}>Setting</a>
                            </li>
                            <li className={activeTab === "language" ? "text-blue-500" : ""}>
                                <a href="#language" className="font-semibold text-[20px]" onClick={() => handleTabClick("language")}>Language</a>
                            </li>
                            <li className={activeTab === "dark-mode" ? "text-blue-500" : ""}>
                                <a href="#dark-mode" className="font-semibold text-[20px]" onClick={() => handleTabClick("dark-mode")}>Dark Mode</a>
                            </li>
                            <li className={activeTab === "help-about" ? "text-blue-500" : ""}>
                                <a href="#help-about" className="font-semibold text-[20px]" onClick={() => handleTabClick("help-about")}>Help & About</a>
                            </li>
                            <li className={activeTab === "log-out" ? "text-blue-500" : ""}>
                                <a href="#log-out" className="font-semibold text-[20px]" onClick={() => handleTabClick("log-out")}>Log Out</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-span-3 bg-gray-300 p-12 ml-12 rounded-[30px]">
                    <div className="tab-content h-[100%]">
                        <div id="edit-profile" className={`container tab-pane ${activeTab === "edit-profile" ? "active h-[100%]" : "hidden"}`}>
                            <div className="h-[100%] px-8">
                                <form action="" className="grid h-[100%]">
                                    <div className="grid content-center">
                                        <label htmlFor="" className="pt-4 font-semibold text-[20px]">Name</label>
                                        <input type="text" className="w-[60%] h-[100%] m-[10px] text-[20px] outline-none rounded-xl pl-4" />
                                    </div>
                                    <label htmlFor="" className="font-semibold text-[20px]">Avatar</label>

                                    <label htmlFor="" className="font-semibold text-[20px]">Background</label>

                                    <div className="text-right font-semibold text-[20px]">
                                        <button className="bg-white p-4 mr-12">Cancel</button>

                                        <button className="bg-white p-4">Save</button>                                          
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div id="setting" className={`container tab-pane ${activeTab === "setting" ? "active h-[100%]" : "hidden"}`}>
                            <h3>Setting</h3>
                        </div>
                        <div id="language" className={`container tab-pane ${activeTab === "language" ? "active h-[100%]" : "hidden"}`}>
                            <h3>Language</h3>
                        </div>
                        <div id="dark-mode" className={`container tab-pane ${activeTab === "dark-mode" ? "active h-[100%]" : "hidden"}`}>
                            <h3>Dark Mode</h3>
                        </div>
                        <div id="log-out" className={`container tab-pane ${activeTab === "log-out" ? "active h-[100%]" : "hidden"}`}>
                            <h3>Log Out</h3>
                        </div>
                        <div id="help-about" className={`container tab-pane ${activeTab === "help-about" ? "active" : "hidden"}`}>
                            <h3>Help & About</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    ); 
};

export default page;
