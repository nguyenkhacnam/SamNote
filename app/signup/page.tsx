"use client";
import React from "react";

import { IoIosArrowBack } from "react-icons/io";

import { PiLockKeyLight, PiCaretLeftBold } from "react-icons/pi";
import Image from "next/image";
import logo from "../../assets/images/6306501 1.png";

import Link from "next/link";
import "./acount.css";


import signup from "../../assets/images/signup.png";



const Signup = () => {

    return (
        <>
        <div className="flex items-center justify-center px-[15px] pt-[40px] w-full h-full sm:hidden">
            <div className="w-full">
                <div>
                    <IoIosArrowBack />
                </div>
                <div className="flex items-center justify-center">
                    <Image
                        src={logo}
                        alt=""
                        className=" w-[150px] h-[154px] object-cover  "
                    />
                </div>
                <div className="text-center mb-3">Create your acount</div>

                <div className="flex items-center justify-center gap-2">
                    <div className="h-[1px] w-full bg-black bg-opacity-80"></div>
                    <div>or</div>
                    <div className="h-[1px] w-full bg-black bg-opacity-80"></div>
                </div>


                <div className="text-[14px] text-black text-opacity-60 text-center mt-2">
                    Already have an account ? <Link href="/login">Sign in</Link>
                </div>
            </div>
        </div>

        <div className="hidden sm:block pt-28 pb-28 xl:pl-40 xl:pr-40 h-[100vh]">
            <div className="flex justify-center items-center bg-gray-300 h-[100%] rounded-[16px] md:p-16">
                <div className="grid w-[50%] h-[100%]">
                    <Link href="/" className="flex items-center h-[50%] text-2xl font-semibold">
                        <PiCaretLeftBold className="ml-10 mr-8"/>   
                        <p>SamNote</p>
                    </Link>
                    <Image
                        src={signup}
                        alt="imgLogin"
                        className=""
                    />
                </div>
                <div className="w-[40%] h-[100%] grid items-center pl-24">
                    <div className="h-[100%]">

                    </div>
                    <div className="text-[14px] text-black text-opacity-60 text-center ">
                        Already have an account ? <Link href="/login" className="font-semibold">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Signup;
