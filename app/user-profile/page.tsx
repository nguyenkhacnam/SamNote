"use client";
import Header from "@/components/Header";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useRouter } from "next/navigation";
import * as message from "../../components/Message/Message";
import { FiUser } from "react-icons/fi";
import { GoSignOut, GoEye } from "react-icons/go";
import { TbMessageLanguage, TbHelpSquareRounded } from "react-icons/tb";
import { IoSettingsOutline, IoCloseCircle } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { resetUser } from "@/redux/feature/UserSlice";
import { Form, Input } from "antd";
import { PiLockKeyLight, PiCaretLeftBold } from "react-icons/pi";
import Item from "antd/es/list/Item";

const Profile = ({}) => {
    const url = "https://lhvn.online/";
    const user = useSelector((state:any) => state.user)
    const dispatch = useDispatch();


    const [activeTab, setActiveTab] = useState("");
    const [isDarkMode, setDarkMode] = useState(false);
    const [profileData, setProfileData] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);




    const [name, setName] = useState("");
    const [gmail, setGmail] = useState("");
    const [avarta, setAvarta] = useState("");
    const [avtProfile, setAvtProfile] = useState("");

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [newpassword, setNewPassword] = useState("");

    const router = useRouter();
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

    useEffect(() => {
        const UserId = user.id;
        if (UserId) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);
            message.error("Bạn cần đăng nhập để xem Profile!");
            router.push("/login");
        }
    }, [router]);

    // console.log("User: ", user);
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const apiUrl = url+`profile/${user.id}`;
            const response = await axios.get(apiUrl);
            setProfileData(response.data);
            // console.log("profile: ", response.data);
          } catch (error) {
            console.error("Lỗi API Profile:", error);
          }
        };
      
        fetchData();
      }, [user.id]);

    //   console.log("profile: ",profileData?.user);

    if (!userLoggedIn) {
        return null;
    }

    const toggleDarkMode = (checked: boolean) => {
        setDarkMode(checked);
        document.body.classList.toggle("dark");
    };

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        if (tabId === "edit-profile") {
            setName(profileData?.user?.name);
            setAvarta(profileData?.user?.Avarta);
            setAvtProfile(profileData?.user?.AvtProfile);
        }
        if (tabId === "setting") {
            setGmail(profileData?.user?.gmail);
        }
        if (tabId === "deleteAccount") {
            setUserName(profileData?.user?.user_Name);
        }
    };
    
    const handleLogout = async () => {
        const userId = profileData?.user?.id;
    
        try {
            const apiUrl = url+`logout/${userId}`;

            const response = await axios.post(apiUrl);
    
            if (response.status === 200) {
                console.log("Logout successful");
                localStorage.removeItem("persist:root");
                dispatch(resetUser());
                message.success("Logout successful");
                router.push("/login");
            } else {
                console.error("Failed to logout:", response.data);
            }
        } catch (error) {
            console.error("An error occurred while logging out:", error);
        }
    };

    const handleDeleteAccount = async () => {
        const userId = profileData?.user?.id;
        try {
            const apiUrl = url+`user/${userId}`;

            const userDelete = {
                user_name: userName,
                password: password,
            };
            
            console.log(userDelete);
            
            const response = await axios.post(apiUrl, userDelete);
    
            if (response.status === 200) {
                console.log("Logout successful");
                localStorage.removeItem("persist:root");
                message.success("Đã xóa tài khoản trên");
                router.push("/");
            } else {
                console.error("Failed to logout:", response.data);
            }
        } catch (error) {
            console.error("An error occurred while logging out:", error);
        }
        setShowDeleteConfirmation(false);
    }

    const handleImageChange = (event:any) => {
        const selectedFile = event.target.files[0];
        setSelectedImage(selectedFile);
    };
    const handleImageChange2 = (event:any) => {
        const selectedFile = event.target.files[0];
        setSelectedImage2(selectedFile);
    };

    const handleUploadImage = async () => {
        try {
            const id = profileData?.user?.id;
            if (id && selectedImage) {
                const formData = new FormData();
                formData.append('image', selectedImage);
                formData.append('key', '2acd4ab023282d21670f660e348d4bdf'); 

            const imgBbResponse = await axios.post('https://api.imgbb.com/1/upload', formData);
            if (imgBbResponse.data.status === 200) {
                const imgBbUrl = imgBbResponse.data.data.url;
                setAvarta(imgBbUrl);
            }
            }
        } catch (error) {
            console.error("Lỗi khi thay đổi avatar:", error);
        }
        setIsModalOpen(false);
    };

    const handleUploadImage2 = async () => {
        try {
            const id = profileData?.user?.id;
            if (id && selectedImage2) {
                const formData = new FormData();
                formData.append('image', selectedImage2);
                formData.append('key', '2acd4ab023282d21670f660e348d4bdf'); 

            const imgBbResponse = await axios.post('https://api.imgbb.com/1/upload', formData);
            if (imgBbResponse.data.status === 200) {
                const imgBbUrl = imgBbResponse.data.data.url;
                setAvtProfile(imgBbUrl);
            }
            }
        } catch (error) {
            console.error("Lỗi khi thay đổi avatar:", error);
        }
        setIsModalOpen2(false);
    };
    
    // console.log("ava: ", avarta);
    // console.log("avapro: ", avtProfile);
    
    const updateUserData = async () => {
        try {
          const apiUrl = url+`profile/change_Profile/${user.id}`;
      
          const dataUpdate = {
            name: name,
            Avarta: avarta,
            AvtProfile: avtProfile
          };
          const response = await axios.patch(apiUrl, dataUpdate);
      
          if (response.status === 200) {
            console.log(response.data.message);
            message.success("Cập nhật thành công!");
            window.location.reload();
          } else {
            console.error("Failed to update user data:", response.data);
          }

        } catch (error) {
          console.error("An error occurred while updating user data:", error);
        }
    };
    
    const changePassword = async (e: any) => {
        // e.preventDefault();
        if(newpassword !== password){
            try {
                const apiUrl = url+`login/change_password/${user.id}`;
            
                const dataUpdate = {
                    gmail: gmail,
                    password: password,
                    new_password: newpassword
                };
                console.log(dataUpdate);
              
                const response = await axios.post(apiUrl, dataUpdate);
            
                if (response.status === 200) {
                    if (response.data.message) {
                        console.log(response.data.message);
                        message.success(response.data.message);
                    } else {
                        console.error("Password is not correct.");
                        message.error("Password is not correct.");
                    }
                } else {
                console.error("Failed to update user data:", response.data);
                }
    
            } catch (error) {
            console.error("An error occurred while updating user data:", error);
            }
        }else{
            message.error("The new password must be different from the current password");
        }
    };  

    const Cancel = () => {
        setActiveTab("");
    }
     
    const validatePassword = (rule: any, value: any, callback: any) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        if (!value) {
            callback("Please input your password.");
        } else if (!regex.test(value)) {
            callback(
                "Password must be 8-16 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character."
            );
        } else {
            callback();
        }
    };

    return (
        <>
            <div className="h-screen md:h-full w-full md:px-4 md:py-2 lg:px-12 lg:py-4">
                {/* <Header/> */}
                <div className="inline-block w-[100%] sm:grid sm:grid-cols-3 xl:grid-cols-4 gap-4 ">
                    <div className=" p-10 rounded-[30px] h-[calc(100vh)] sm:h-[calc(88vh)] sm:col-span-1 sm:bg-gray-300 sm:p-10 sm:rounded-[30px]">            
                            <div className="2xl:flex 2xl:items-center 2xl:justify-evenly pt-12 pb-12">
                                <div className="sm:col-span-1 rounded-full">
                                    <img src={profileData?.user?.AvtProfile} alt={profileData?.user?.name} className="rounded-full w-[100px] h-[100px] object-cover m-auto"/>
                                </div>
                                <div className="col-span-2 text-[24px] font-semibold text-center">
                                    {profileData?.user?.name}
                                </div>
                            </div>
                            <hr className="bg-black h-[2px]"/>
                            <div className="pt-8 h-[60%]">
                                <ul className="h-[100%] grid items-center">
                                    <li className={activeTab === "edit-profile" ? "text-blue-500" : ""}>
                                        <a href="#edit-profile" className="font-semibold text-[20px] flex items-center" onClick={() => handleTabClick("edit-profile")}><FiUser className="mr-4 sm:hidden"/> Edit profile</a>
                                    </li>
                                    <li className={activeTab === "setting" ? "text-blue-500" : ""}>
                                        <a href="#setting" className="font-semibold text-[20px] flex items-center" onClick={() => handleTabClick("setting")}><IoSettingsOutline className="mr-4 sm:hidden"/> Setting</a>
                                    </li>
                                    <li className={activeTab === "language" ? "text-blue-500" : ""}>
                                        <a href="#language" className="font-semibold text-[20px] flex items-center" onClick={() => handleTabClick("language")}><TbMessageLanguage className="mr-4 sm:hidden"/> Language</a>
                                    </li>
                                    <li className={activeTab === "dark-mode" ? "text-blue-500 flex justify-between items-center" : "flex justify-between items-center"}>
                                        <a href="#dark-mode" className="font-semibold text-[20px] flex items-center" onClick={() => handleTabClick("dark-mode")}><GoEye className="mr-4 sm:hidden"/> Dark Mode</a>
                                        <DarkModeSwitch
                                            style={{}}
                                            checked={isDarkMode}
                                            onChange={toggleDarkMode}
                                            size={32}
                                        />
                                    </li>
                                    <li className={activeTab === "help-about" ? "text-blue-500" : ""}>
                                        <a href="#help-about" className="font-semibold text-[20px] flex items-center" onClick={() => handleTabClick("help-about")}><TbHelpSquareRounded className="mr-4 sm:hidden"/> Help & About</a>
                                    </li>
                                    <li className={activeTab === "deleteAccount" ? "text-blue-500" : ""}>
                                        <a href="#deleteAccount" className="font-semibold text-[20px] flex items-center" onClick={() => handleTabClick("deleteAccount")}><RiDeleteBinLine className="mr-4 sm:hidden"/> Delete the account</a>
                                    </li>
                                    <li className="">
                                        <button className="font-semibold text-[20px] flex items-center" onClick={() => {setShowLogoutConfirmation(true)}}><GoSignOut className="mr-4 sm:hidden"/> Log Out</button>           
                                    </li>
                                </ul>
                            </div>
                        
                    </div>
                    {activeTab !== "" && (
                    <div className="col-span-2 xl:col-span-3 bg-gray-300 sm:p-10 md:p-0 xl:p-10 lg:ml-8 xl:ml-12 rounded-[30px] h-[80vh] mb-32 mt-4 sm:mb-0 sm:mt-0 sm:h-auto">
                        <div className="tab-content h-[100%]">
                            <div id="edit-profile" className={`container tab-pane ${activeTab === "edit-profile" ? "active h-[100%]" : "hidden"}`}>
                                <div className="h-[100%] px-8">
                                    <form action="" className="grid h-[100%]">
                                        <div className="grid content-center">
                                            <label htmlFor="" className="pt-4 font-semibold text-[20px]">Name</label>
                                            <input type="text" name="name" className="w-[90%] lg:w-[70%] xl:w-[60%]  h-[100%] m-[10px] text-[20px] outline-none rounded-xl pl-4" 
                                                value={name} 
                                                onChange={(e) => setName(e.target.value)} 
                                            />
                                        </div>
                                        {/* <div className="grid content-center">
                                            <label htmlFor="" className="pt-4 font-semibold text-[20px]">Gmail</label>
                                            <input type="text" name="gmail" className="w-[60%] h-[100%] m-[10px] text-[20px] outline-none rounded-xl pl-4" 
                                                value={gmail} 
                                                onChange={(e) => setGmail(e.target.value)} 
                                            />
                                        </div> */}
                                        <div className="flex h-[60%] sm:h-[80%]">
                                            <div style={{width:'50%'}}>
                                                <label htmlFor="" className="pt-4 font-semibold text-[20px]">Avarta</label>
                                                <a type="button" onClick={() => setIsModalOpen(true)} style={{cursor:'pointer', display:'contents'}}>
                                                    <img src={avarta} alt="ava" className="w-[80%] h-[90px] sm:w-[70%] sm:h-[120px] md:w-[80%] md:h-[200px] lg:w-[70%] xl:w-[60%] object-cover"/>
                                                </a>
                                            </div>
                                            <div style={{width:'50%'}}>
                                                <label htmlFor="" className="pt-4 font-semibold text-[20px]">AvtProfile</label>
                                                <a type="button" onClick={() => setIsModalOpen2(true)} style={{cursor:'pointer', display:'contents'}}>
                                                    <img src={avtProfile} alt="ava" className="w-[80%] h-[90px] sm:w-[70%] sm:h-[120px] md:w-[80%] md:h-[200px] lg:w-[70%] xl:w-[60%] object-cover" />
                                                </a>
                                            </div>
                                        </div>
                                        {/* <div className="grid content-center">
                                            
                                        </div> */}
                                    {/* <label htmlFor="" className="font-semibold text-[20px]">Avatar</label>

                                    <label htmlFor="" className="font-semibold text-[20px]">Background</label> */}

                                        <div className="m-auto mr-0 font-semibold text-[20px] h-[100%]">
                                            <button type="button" onClick={Cancel} className="bg-white p-4 mr-12">Cancel</button>

                                            <button type="button" className="bg-white p-4" onClick={updateUserData}>Save</button>                                          
                                        </div>
                                    </form>
                                </div>
                                {isModalOpen && (
                                    <div className="confirmation-modal fixed inset-0 flex items-center sm:items-center justify-center bg-gray-800 bg-opacity-75">
                                        <div className="bg-white p-4 relative rounded-lg shadow-lg w-[100%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-[30%] grid justify-center justify-items-center items-center">
                                            <h3>Chọn avatar </h3>
                                            <input type="file" onChange={handleImageChange} />
                                            {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-[50%] h-[120px] object-cover"/>}
                                            <button className="bg-sky-600 rounded-md p-2 font-semibold" onClick={handleUploadImage}>Tải lên</button>
                                            <button className="absolute top-3 right-3 text-2xl" onClick={() => setIsModalOpen(false)}><IoCloseCircle/></button>
                                        </div>
                                    </div>
                                )}
                                {isModalOpen2 && (
                                    <div className="confirmation-modal fixed inset-0 flex items-center sm:items-center justify-center bg-gray-800 bg-opacity-75">
                                        <div className="bg-white p-4 relative rounded-lg shadow-lg w-[100%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-[30%] grid justify-center justify-items-center items-center">
                                            <h3>Chọn avatar profile</h3>
                                            <input type="file" onChange={handleImageChange2} />
                                            {selectedImage2 && <img src={URL.createObjectURL(selectedImage2)} alt="Selected" className="w-[50%] h-[120px] object-cover"/>}
                                            <button className="bg-sky-600 rounded-md p-2 font-semibold" onClick={handleUploadImage2}>Tải lên</button>
                                            <button className="absolute top-3 right-3 text-2xl" onClick={() => setIsModalOpen2(false)}><IoCloseCircle/></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div
                                id="setting"
                                className={`container tab-pane ${
                                    activeTab === "setting"
                                        ? "active h-[100%]"
                                        : "hidden"
                                }`}
                            >
                                <div className="h-[100%] px-8">
                                <Form
                                    name="basic"
                                    wrapperCol={{
                                        span: 24,
                                    }}
                                    onFinish={changePassword}
                                    // onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    className="grid h-[100%]"
                                >
                                        <div className="grid items-center content-evenly">
                                            <label
                                                htmlFor=""
                                                className="pt-4 font-semibold"
                                                style={{fontSize:'20px'}}
                                            >
                                                Gmail
                                            </label>
                                            <input
                                                type="text"
                                                name="gmail"
                                                className="w-[90%] lg:w-[70%] xl:w-[60%] h-[100%] m-[10px] text-[20px] outline-none rounded-xl pl-4"
                                                value={gmail}
                                            />
                                        </div>
                                        <div className="grid items-center content-evenly">
                                            <label
                                                htmlFor=""
                                                className="pt-4 font-semibold"
                                                style={{fontSize:'20px'}}
                                            >
                                                Password
                                            </label>
                                            <Form.Item
                                                name="password"
                                                rules={[
                                                    {
                                                        validator: validatePassword,
                                                    },
                                                ]}
                                                className="w-[90%] lg:w-[70%] xl:w-[60%] "
                                            >
                                                <Input.Password
                                                placeholder="Input password"
                                                prefix={<PiLockKeyLight className="" />}
                                                className="h-[100%] m-[10px] text-[20px] outline-none rounded-xl pl-4"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)} 
                                            />
                                            </Form.Item>
                                        </div>

                                        <div className="grid items-center content-evenly" >
                                            <label
                                                htmlFor=""
                                                className="pt-4 font-semibold"
                                                style={{fontSize:'20px'}}
                                            >
                                                New Password 
                                            </label>
                                            <Form.Item
                                                name="newpassword"
                                                rules={[
                                                    {
                                                        validator: validatePassword,
                                                    },
                                                ]}
                                                className="w-[90%] lg:w-[70%] xl:w-[60%] "
                                            >
                                                <Input.Password
                                                placeholder="Input password"
                                                prefix={<PiLockKeyLight className="" />}
                                                className="h-[100%] m-[10px] text-[20px] outline-none rounded-xl pl-4"
                                                value={newpassword}
                                                onChange={(e) => setNewPassword(e.target.value)} 
                                            />
                                            </Form.Item>
                                        </div>

                                        <div className="m-auto mr-0 font-semibold text-[20px] h-[100%]">
                                            <button type="button" onClick={Cancel} className="bg-white p-4 mr-12">
                                                Cancel
                                            </button>

                                            <button type="submit" className="bg-white p-4" >
                                                Save
                                            </button>
                                        </div>
                                        </Form>
                                </div>
                            </div>
                            <div
                                id="language"
                                className={`container tab-pane ${
                                    activeTab === "language"
                                        ? "active h-[100%]"
                                        : "hidden"
                                }`}
                            >
                                <h3>Language</h3>
                            </div>
                            <div
                                id="dark-mode"
                                className={`container tab-pane ${
                                    activeTab === "dark-mode"
                                        ? "active h-[100%]"
                                        : "hidden"
                                }`}
                            >
                                <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
                                    <div>
                                        <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
                                            <svg
                                                className="h-6 w-6 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            ></svg>
                                        </span>
                                    </div>
                                    <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                                        Writes Upside-Down
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                                        The Zero Gravity Pen can be used to
                                        write in any orientation, including
                                        upside-down. It even works in outer
                                        space.
                                    </p>
                                    <DarkModeSwitch
                                        style={{}}
                                        checked={isDarkMode}
                                        onChange={toggleDarkMode}
                                        size={50}
                                    />
                                </div>
                            </div>
                                
                            <div
                                id="help-about"
                                className={`container tab-pane ${
                                    activeTab === "help-about"
                                        ? "active"
                                        : "hidden"
                                }`}
                            >
                                <h3>Help & About</h3>
                            </div>
                            <div id="deleteAccount" className={`container tab-pane ${activeTab === "deleteAccount" ? "active" : "hidden"}`} style={{height:'60%'}}>
                                <div className="h-[100%] px-8">
                                        <form action="" className="grid h-[100%]">
                                            <div className="grid content-center">
                                                <label htmlFor="" className="pt-4 font-semibold text-[20px]">User-name</label>
                                                <input type="text" name="name" className="w-[90%] lg:w-[70%] xl:w-[60%] h-[100%] m-[10px] text-[20px] outline-none rounded-xl pl-4" 
                                                    value={userName} 
                                                    
                                                />
                                            </div>
                                            <div className="grid content-center">
                                                <label htmlFor="" className="pt-4 font-semibold text-[20px]">PassWord</label>
                                                <input type="password" name="password" className="w-[90%] lg:w-[70%] xl:w-[60%] h-[100%] m-[10px] text-[20px] outline-none rounded-xl pl-4" 
                                                    value={password} 
                                                    onChange={(e) => setPassword(e.target.value)} 
                                                />
                                            </div>
                                            {/* <label htmlFor="" className="font-semibold text-[20px]">Avatar</label>

                                            <label htmlFor="" className="font-semibold text-[20px]">Background</label> */}

                                            <div className=" m-auto mr-0 font-semibold text-[20px] h-[100%]">
                                                <button className="bg-white p-4 mr-10" onClick={Cancel} >Cancel</button>

                                                <button type="button" className="bg-white p-4"  onClick={() => setShowDeleteConfirmation(true)}>Delete</button>                                          
                                            </div>
                                        </form>
                                    </div>
                                    {showDeleteConfirmation && (
                                        <div className="confirmation-modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                                            <div className="bg-white p-4 rounded-lg shadow-lg w-[100%] md:w-[40%] h-[30%] grid justify-center justify-items-center items-center">
                                                <p className="text-4xl font-semibold text-red-600">Delete</p>
                                                <div className="bg-black h-[2px] w-[120%]"> </div>
                                                <p className="text-lg font-semibold">Are you sure Delete account ?</p>
                                                <div className="flex w-[100%] justify-between">
                                                    <button
                                                        className="bg-gray-300 text-gray-700 hover:bg-gray-400 pt-4 pb-4 pl-8 pr-8 rounded-[30px]" style={{boxShadow:"0px 4px 4px 0px #00000080"}}
                                                        onClick={() => setShowDeleteConfirmation(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white hover:bg-red-600 pt-4 pb-4 pl-8 pr-8 rounded-[30px]" style={{boxShadow:"0px 4px 4px 0px #00000080"}}
                                                        onClick={() => {
                                                            setShowDeleteConfirmation(false);
                                                            handleDeleteAccount();
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    )}
                            </div>
                        </div>
                    </div>
                    )}
                    {showLogoutConfirmation && (
                        <div className="confirmation-modal fixed inset-0 flex items-end sm:items-center justify-center bg-gray-800 bg-opacity-75">
                            <div className="bg-white p-4 rounded-lg shadow-lg w-[100%] sm:w-[30%] h-[30%] grid justify-center justify-items-center items-center">
                                <p className="text-4xl font-semibold text-red-600">Logout</p>
                                <div className="bg-black h-[2px] w-[120%]"> </div>
                                <p className="text-lg font-semibold">Are you sure you want to log out ?</p>
                                <div className="flex w-[100%] justify-around">
                                    <button
                                        className="bg-gray-300 text-gray-700 hover:bg-gray-400 pt-4 pb-4 pl-8 pr-8 rounded-[30px]" style={{boxShadow:"0px 4px 4px 0px #00000080"}}
                                        onClick={() => setShowLogoutConfirmation(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white hover:bg-blue-600 pt-4 pb-4 pl-8 pr-8 rounded-[30px]" style={{boxShadow:"0px 4px 4px 0px #00000080"}}
                                        onClick={() => {
                                            setShowLogoutConfirmation(false);
                                            handleLogout();
                                        }}
                                    >
                                        Yes, Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;
