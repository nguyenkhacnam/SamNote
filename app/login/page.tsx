"use client";
import React, { useState, useRef } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { GoMail } from "react-icons/go";
import { PiLockKeyLight } from "react-icons/pi";
import Image from "next/image";
import logo from "../../assets/images/6306501 1.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../signup/acount.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import * as message from "../../components/Message/Message";
import { useDispatch } from 'react-redux'
import { updateUser } from "@/redux/feature/UserSlice";

export const validatePassword = (rule: any, value: any, callback: any) => {
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

export const validateEmail = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback("Please input your email.");
    } else {
        const trimmedValue = value.trim(); // Remove leading and trailing spaces
        if (trimmedValue === value) {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(trimmedValue)) {
                callback("Email is not valid.");
            } else {
                callback();
            }
        } else {
            callback("Email should not contain leading or trailing spaces.");
        }
    }
};

const page = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const onFinish = async (values: any) => {
        console.log("Success:", values);

        try {
            const response = await axios.post(
                "https://lhvn.online/login",
                values
            );
            console.log(response.data);
            dispatch(updateUser(response?.data?.user))
            message.success(response?.data?.message);
            router.push("/");
        } catch (error: any) {
            message.error(error?.response?.data?.message);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const onChange = (e: any) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const handleLoginWithSocial = (credentialResponse: any) => {
        const data = credentialResponse.credential;
        var decoded = jwt_decode(data);
        console.log("decoded", data);
    };






    return (
        <div className="flex items-center justify-center px-[15px] pt-[40px] w-full h-full ">
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
                <div className="text-center mb-3">Login to Your Account</div>
                <Form
                    name="basic"
                    wrapperCol={{
                        span: 24,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className=""
                >
                    <Form.Item name="user_name" rules={[{ required: true, message: 'Please input your username!' }]} >
                        <Input
                            placeholder="Input user name"
                            prefix={<AiOutlineUser />}
                            className="bg-[#EBEBEB] p-2"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                validator: validatePassword,
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Input password"
                            prefix={<PiLockKeyLight className="" />}
                            className="bg-[#EBEBEB] p-2"
                        />
                    </Form.Item>
                    <Checkbox onChange={onChange}>Remember me</Checkbox>
                    <Form.Item wrapperCol={{ span: 24 }} className="mt-2">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full h-[55px] bg-[#267BFA] shadow-md rounded-[30px] "
                        >
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <div className="flex items-center justify-center gap-2">
                    <div className="h-[1px] w-full bg-black bg-opacity-80"></div>
                    <div>or</div>
                    <div className="h-[1px] w-full bg-black bg-opacity-80"></div>
                </div>
                <div className="">
                    <GoogleOAuthProvider clientId="946264574600-45lpld1c2dibskshl55d79lauhtef8rk.apps.googleusercontent.com">
                        <GoogleLogin
                            onSuccess={handleLoginWithSocial}
                            onError={() => {
                                console.log("Login Failed");
                            }}
                        />
                    </GoogleOAuthProvider>
                </div>

                <div className="text-[14px] text-black text-opacity-60 text-center mt-2">
                    Don’t have an account ? <Link href="/signup" className="text-red" > Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default page;
