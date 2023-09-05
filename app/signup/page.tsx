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
import xinh from "../../assets/images/xinh1.jpg";
import "./acount.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);


    const onFinish = async (values: any) => {
        console.log("Success:", values);
        try {
            const response = await axios.post("http://14.225.7.179:18011/register");

            // Check if the response status is OK (2xx) before accessing data
            if (response.status === 200) {
                console.log(response.data); // Access response data here
            } else {
                console.log("Request failed with status:", response.status);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    const onChange = (e: any) => {
        console.log(`checked = ${e.target.checked}`);
    };


    return (
        <div className="flex items-center justify-center px-[15px] w-[100vw] h-[100vh] ">
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
                    <Form.Item name="name">
                        <Input
                            placeholder="Input name"
                            prefix={<AiOutlineUser />}
                            className="bg-[#EBEBEB] p-2"
                        />
                    </Form.Item>

                    <Form.Item name="email">
                        <Input
                            placeholder="Input Email"
                            prefix={<GoMail />}
                            className="bg-[#EBEBEB] p-2"
                        />
                    </Form.Item>
                    <Form.Item name="user_name">
                        <Input
                            placeholder="Input user name"
                            prefix={<AiOutlineUser />}
                            className="bg-[#EBEBEB] p-2"
                        />
                    </Form.Item>

                    <Form.Item name="password">
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
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <div className="flex items-center justify-center gap-2" >
                    <div className="h-[1px] w-full bg-black bg-opacity-80" ></div>
                    <div>or</div>
                    <div className="h-[1px] w-full bg-black bg-opacity-80" ></div>

                </div>
                <div className="w-[16px] h-[16px]">


                    <GoogleOAuthProvider
                        clientId="812888106047-eu7o2somicm7ogenhodihh1jpbjc9a7c.apps.googleusercontent.com"

                    >
                        <GoogleLogin
                            onSuccess={(credentialResponse: any) => {
                                var decoded = jwt_decode(credentialResponse.credential);
                                console.log('decoded', decoded);
                            }}
                            onError={() => {
                                console.log("Login Failed");
                            }}
                        />
                    </GoogleOAuthProvider>

                </div>

            </div>
        </div>
    );
};

export default SignUp;
