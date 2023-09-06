"use client";
import Header from "@/components/Header";
import { FC, useState } from "react";
import { DarkModeSwitch } from 'react-toggle-dark-mode';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
    const [activeTab, setActiveTab] = useState("");

    const [isDarkMode, setDarkMode] = useState(false);

    const toggleDarkMode = (checked: boolean) => {
      setDarkMode(checked);
      document.body.classList.toggle('dark');
    };

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    
    return (
        <>
        <div className="h-screen md:h-full w-full md:px-4 md:py-2 lg:px-12 lg:py-4">
            <Header/>

            <div className="inline-block w-[100%] sm:grid sm:grid-cols-3 xl:grid-cols-4 gap-4 pt-12 ">
                <div className="col-span-1 bg-gray-300 p-10 rounded-[30px] h-[calc(100vh)] sm:h-[calc(75vh)]">
                    <div className="grid justify-center xl:flex xl:items-center xl:justify-evenly">
                        <div className="sm:col-span-1 bg-red-600 w-[100px] h-[100px] rounded-full">
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
                            <li className={activeTab === "dark-mode" ? "text-blue-500 flex justify-between" : "flex justify-between"}>
                                <a href="#dark-mode" className="font-semibold text-[20px]" onClick={() => handleTabClick("dark-mode")}>Dark Mode</a>
                                <DarkModeSwitch
                                    style={{}}
                                    checked={isDarkMode}
                                    onChange={toggleDarkMode}
                                    size={32}
                                />
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
                <div className="col-span-2 xl:col-span-3 bg-gray-300 p-12 lg:ml-12 rounded-[30px] h-[80vh] mb-32 mt-4 sm:mb-0 sm:mt-0 sm:h-auto">
                    <div className="tab-content h-[100%]">
                        <div id="edit-profile" className={`container tab-pane ${activeTab === "edit-profile" ? "active h-[100%]" : "hidden"}`}>
                            <div className="h-[100%] px-8">
                                <form action="" className="grid h-[100%]">
                                    <div className="grid content-center">
                                        <label htmlFor="" className="pt-4 font-semibold text-[20px]">Name</label>
                                        <input type="text" name="name" className="w-[60%] h-[100%] m-[10px] text-[20px] outline-none rounded-xl pl-4" />
                                    </div>
                                    <label htmlFor="" className="font-semibold text-[20px]">Avatar</label>

                                    <label htmlFor="" className="font-semibold text-[20px]">Background</label>

                                    <div className="m-auto mr-0 font-semibold text-[20px]">
                                        <button className="bg-white p-4 mr-12">Cancel</button>

                                        <button className="bg-white p-4">Save</button>                                          
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div id="setting" className={`container tab-pane ${activeTab === "setting" ? "active h-[100%]" : "hidden"}`}>
                            <div className="h-[100%] px-8">
                                <form action="" className="grid h-[100%]">
                                    <div className="grid items-center content-evenly">
                                        <label htmlFor="" className="pt-4 font-semibold text-[20px]">Gmail</label>
                                        <input type="text" name="gmail" className="w-[60%] h-[100%] m-[10px] text-[20px] outline-none rounded-xl pl-4" />
                                    </div>
                                    <div className="grid items-center content-evenly">
                                        <label htmlFor="" className="pt-4 font-semibold text-[20px]">Password</label>
                                        <input type="password" name="password" className="w-[60%] h-[100%] m-[10px] text-[20px] outline-none rounded-xl pl-4" />
                                    </div>

                                    <div className="grid items-center content-evenly">
                                        <label htmlFor="" className="pt-4 font-semibold text-[20px]">Password 2</label>
                                        <input type="password" name="password" className="w-[60%] h-[100%] m-[10px] text-[20px] outline-none rounded-xl pl-4" />
                                    </div>

                                    <div className="m-auto mr-0 font-semibold text-[20px]">
                                        <button className="bg-white p-4 mr-12">Cancel</button>

                                        <button className="bg-white p-4">Save</button>                                          
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div id="language" className={`container tab-pane ${activeTab === "language" ? "active h-[100%]" : "hidden"}`}>
                            <h3>Language</h3>
                        </div>
                        <div id="dark-mode" className={`container tab-pane ${activeTab === "dark-mode" ? "active h-[100%]" : "hidden"}`}>
                            <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
                                <div>
                                    <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
                                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"></svg>
                                    </span>
                                </div>
                                <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
                                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                                    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
                                </p>
                                <DarkModeSwitch
                                    style={{}}
                                    checked={isDarkMode}
                                    onChange={toggleDarkMode}
                                    size={50}
                                />
                            </div>
                            
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
