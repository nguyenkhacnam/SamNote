"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import banner1 from "../../assets/images/about1.png";
import banner2 from "../../assets/images/about2.png";
import logo from "../../assets/images/logo.png";
import banner3 from "../../assets/images/about3.jpg";
import apple from "../../assets/images/apple.svg";
import google from "../../assets/images/google.svg";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const About = ({}) => {
    const router = useRouter();

    return (
        <div className="py-5 md:px-[35px] md:py-[15px] lg:px-[95px] lg:py-[20px] h-full">
            <div>
                <div className="flex items-center gap-3 pb-5 md:pb-8 lg:pb-10 xl:pb-15">
                    <IoIosArrowBack
                        onClick={() => router.back()}
                        className="w-[24px] h-[24px] md:w-[28px] md:h-[28px]"
                    />
                    <h1 className="text-[20px] md:text-[25px] lg:text-[30px] font-bold">
                        About
                    </h1>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-[40px]">
                <div>
                    <Image
                        src={banner1}
                        width={1393}
                        height={639}
                        alt=""
                        className=""
                    />
                </div>
                <div>
                    <Image
                        src={banner2}
                        width={1486}
                        height={380}
                        alt=""
                        className=""
                    />
                </div>
                <div className="w-full flex flex-col gap-10">
                    <div className="flex items-center justify-between gap-5 w-full">
                        <div className="flex flex-col items-start gap-10">
                            <h1 className="text-[30px] lg:text-[40px] xl:text-[50px] font-bold">
                                Ready to get started?
                            </h1>
                            <div className="px-5 py-3 bg-[#0081FE] rounded-[27px] cursor-pointer hover:bg-[#54a2f0]">
                                <p className="text-white text-[18px]">
                                    KICKSTART YOUR FUTURE
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Image
                                    src={logo}
                                    width={60}
                                    height={60}
                                    alt="Logo"
                                />
                                <p className="text-[20px] lg:text-[24px] font-bold">
                                    SAMNOTE
                                </p>
                            </div>
                        </div>
                        <div>
                            <Image
                                src={banner3}
                                width={250}
                                height={300}
                                alt=""
                                className=" rounded-full"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-10 lg:flex-row py-[50px]">
                        <div className="flex items-center gap-3">
                            <Image src={apple} width={167} height={50} alt="" />
                            <Image
                                src={google}
                                width={167}
                                height={50}
                                alt=""
                            />
                        </div>
                        <div className="flex items-center justify-between gap-5">
                            <p>&copy; 2019 Lift Media. All Rights Reserved.</p>
                            <div className="flex items-center gap-2">
                                <FaFacebookF className="w-[40px] h-[40px] border-[1px] border-[#ccc] p-2 rounded-full cursor-pointer hover:text-[#0000008b]" />
                                <FaLinkedinIn className="w-[40px] h-[40px] border-[1px] border-[#ccc] p-2 rounded-full cursor-pointer hover:text-[#0000008b]" />
                                <FaTwitter className="w-[40px] h-[40px] border-[1px] border-[#ccc] p-2 rounded-full cursor-pointer hover:text-[#0000008b]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
