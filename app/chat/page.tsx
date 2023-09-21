"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { CiSearch, CiMenuBurger, CiImageOn } from "react-icons/ci";
import { TfiMenuAlt, TfiHeart } from "react-icons/tfi";
import onl from "../../assets/images/onl.png";
import "./chat.css"
import { AiOutlineSend } from "react-icons/ai";
import * as message from "../../components/Message/Message";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllNotes } from "@/redux/feature/NotesSlice";



interface Note {
    idNote: number;
    data: string;
    color: any;
    createAt: string;
    title: string;
}

const Chat = () => {
    const url = "https://lhvn.online/";
    const user = useSelector((store: any) => store.user);
    // console.log("user: ",user);
    
    const [notes, setNotes] = useState<Note[]>([]);
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState("");
    const [chat, setChat] =useState("");
    const [dataChatUser, setDataChatUser] = useState([]);
    const [dataChat, setDataChat] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const UserId = user.id;
        if (UserId) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);
            message.error("Bạn cần đăng nhập để Chat!");
            router.push("/login");
        }
    }, [router]); 


    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    const handleSendChat = async (e: any, receiverId: number) => {
        e.preventDefault();
        
        try {
            const dataChat = {
                sendAt : new Date,
                idReceive : receiverId,
                content : chat,
                idSend : user.id
            }
            console.log(dataChat);
            const response = await axios.post(url+`message/chat-unknown/${receiverId}`,dataChat);
            if (response.status === 200) {
                console.log("Chat sent successfully!");
                setChat("");
                handleGetChat();
                handleGetChatUser();
            } else {
                console.error("Failed to send chat");
            }
        } catch (error) {
            console.error("Error sending chat:", error);
        }
        
    };

    const handleGetChat = async () => {
        try {
            console.log("idddd: ",activeTab);
            
            const response = await axios.get(
                url+`message/chat-unknown/${activeTab}`
            );
            if (response.status === 200) {
                const chatData = response.data;
                // console.log("Chat data:", chatData.data);
                setDataChat(chatData.data);
            } else {
                console.error("Failed to retrieve chat data");
            }
        } catch (error) {
            console.error("Error retrieving chat data:", error);
        }
    }

    const handleGetChatUser = async () => {
        try {
            const response = await axios.get(
                url+`message/chat-unknown/${user.id}`
            );
            if (response.status === 200) {
                const chatDataUser = response.data;
                // console.log("Chat data user:", chatDataUser.data);
                setDataChatUser(chatDataUser.data)
            } else {
                console.error("Failed to retrieve chat data");
            }
        } catch (error) {
            console.error("Error retrieving chat data:", error);
        }
    }

    useEffect(() => {
        handleGetChatUser();
    }, [user.id]);

    useEffect(() => {
        handleGetChat();
    }, [activeTab]);

    // setInterval(handleGetChat, 2000);

    useEffect(() => {
        const handleGetUser = async () => {
            try {
                const response = await axios.get(
                    url+`lastUser`
                );
                if (response.status === 200) {
                    const listUser = response.data;
                    // console.log("List user:", listUser.data);
                    setListUser(listUser.data);
                } else {
                    console.error("Failed to list user");
                }
            } catch (error) {
                console.error("Error list user:", error);
            }
        }
        handleGetUser();
    }, []);

    if (!userLoggedIn) {
        return null;
    }

    const combinedData = [...dataChat, ...dataChatUser].map((item:any) => {
        return { ...item, sendAt: new Date(item.sendAt).getTime() };
      });

    combinedData.sort((a, b) => a.sendAt - b.sendAt);

    // const fetchData = useCallback(async () => {
    //     try {
    //         const response = await fetch(
    //             `https://lhvn.online/notes/${user.id}`
    //         );

    //         if (!response.ok) {
    //             throw new Error("Something went wrong!");
    //         }

    //         const data = await response.json();
    //         console.log("Data: ",data);
            
    //         dispatch(getAllNotes(data.notes));
    //         setNotes(data?.notes);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [dispatch, user.id]);

    // useEffect(() => {
    //     fetchData();
    // }, [fetchData]);



    return (
        <>
            <div className="h-screen md:h-full w-full md:px-4 md:py-2 lg:px-12 lg:py-4">
                {/* <Header
                    user={user}
                    num_notes={notes?.length}
                    setDisplayState={undefined}
                    setDisplayNotes={undefined}
                    setIsSearch={undefined} 
                /> */}
            
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
                            <ul className="">
                                {listUser.map((userlist:any) => (
                                    userlist.id !== user.id ? (
                                        <li key={userlist.id} className={activeTab === userlist.id ? "text-blue-500" : ""}>
                                            <a href={`#${userlist.id}`} className="" onClick={() => handleTabClick(userlist.id)}>
                                                <div className="flex sm:grid sm:pl-0 xl:flex 2xl:pl-8  items-center pl-8 mb-8 cursor-pointer">
                                                    <div className="sm:col-span-1 w-[50px] h-[50px] rounded-full relative">
                                                        <img src={userlist?.linkAvatar} alt=""  className="rounded-full "/>
                                                        <Image
                                                            src={onl}
                                                            alt=""
                                                            className="absolute right-0 bottom-0"
                                                        />
                                                    </div>
                                                    <div className="pl-6 sm:pl-0 2xl:pl-6">
                                                        <p className="text-[18px] font-medium">{userlist.name}</p>
                                                        <p className="text-[14px] ">A sent a photo. 9:45</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    ) : null
                                ))}
                                    
                            </ul>
                        </div>
                    </div>

                    {activeTab !== "" ? (
                        <div className="col-span-2 xl:col-span-3 bg-gray-300  sm:p-12 rounded-[30px] h-[80vh] mb-32 mt-4 sm:mb-0 sm:mt-0 ">

                                <div className="tab-content h-[100%]">

                                    {listUser.map((userlist:any) => (
                                        <div key={userlist.id} id={userlist.id} className={`${activeTab === userlist.id ? "active h-[100%]" : "hidden"}`}>
                                            <div className="h-full">
                                                <div className="flex justify-between items-center pt-4 pb-4 pl-2 pr-2 lg:pl-10 lg:pr-12 bg-white rounded-[20px]">
                                                    <div className="flex items-center">
                                                        <div className="sm:col-span-1 w-[50px] h-[50px] rounded-full relative">
                                                            <img src={userlist?.linkAvatar} alt=""  className="rounded-full "/>
                                                            <Image
                                                                src={onl}
                                                                alt=""
                                                                className="absolute right-0 bottom-0"
                                                            />
                                                        </div>
                                                        <p className="text-[24px] font-medium pl-4">{userlist.name}</p>
                                                    </div>
                                                    <div className="flex">
                                                        <CiSearch className="text-[26px] mr-2 lg:mr-10"/>
                                                        <TfiMenuAlt className="text-[26px]"/> 
                                                    </div>
                                                </div>

                                                <div className="h-[81%] sm:h-[72%] overflow-y-auto section">
                                                    <div className="px-6 py-5 h-full">
                                                        {combinedData.map((chatItem: any, index: number) => (
                                                        chatItem.idReceive === userlist.id ? (
                                                            <div key={index} className="flex flex-col items-end">
                                                            <p
                                                                className="max-w-[80%] w-fit bg-blue-700 text-white rounded-[30px] px-4 py-2 mb-2"
                                                            >
                                                                {chatItem.content}
                                                            </p>
                                                            </div>
                                                        ) : (
                                                            chatItem.idReceive === user.id ? (
                                                            <div className="flex">
                                                                <div className="sm:col-span-1 w-[40px] h-[40px] rounded-full relative">
                                                                    <img src={userlist?.linkAvatar} alt=""  className="rounded-full "/>
                                                                </div>
                                                                <p
                                                                    key={index}
                                                                    className="max-w-[80%] w-fit bg-white rounded-[30px] px-4 py-2 mb-2 ml-3"
                                                                >
                                                                    {chatItem.content}
                                                                </p>
                                                            </div>
                                                            ) : null
                                                        )
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center pt-3 pb-3 pl-1 pr-1 lg:pl-10 xl:pl-16 lg:pr-12 bg-white rounded-[20px]">
                                                    <div className="flex">
                                                        <CiMenuBurger className="text-[26px] text-blue-600 mr-2 lg:mr-8"/>
                                                        <CiImageOn className="text-[26px] text-blue-600"/> 
                                                    </div>
                                                    <div className="flex w-[80%] xl:w-[65%] items-center pr-1 xl:pr-14">
                                                        <div className="relative mr-1 lg:mr-10 w-full">
                                                            <form onSubmit={(e) => {
                                                                e.preventDefault();
                                                                if (chat.trim() !== '') {
                                                                    handleSendChat(e, userlist.id);
                                                                }
                                                            }}>
                                                                <input type="text" className="w-full p-4 pl-8 pr-14 bg-gray-200 rounded-[20px] outline-none " placeholder="Messaging" 
                                                                value={chat} 
                                                                onChange={(e) => setChat(e.target.value)} 
                                                                />
                                                                <button type="submit" disabled={!chat} className="absolute bottom-0 right-0 p-4 text-[24px]"><AiOutlineSend/></button>
                                                            </form>
                                                        </div>
                                                        <TfiHeart className="text-[26px] text-blue-600"/> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>


                        </div>
                    ) : (
                        <div className="col-span-2 xl:col-span-3 h-[80vh] flex items-center justify-center font-semibold text-[24px]">
                            Select a chat or start a new conversatiopxn
                        </div>
                    )}

                </div>

            </div>
        </>
    );
};

export default Chat;
