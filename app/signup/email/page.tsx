"use client";
import React, { useState, useRef } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { GoMail } from "react-icons/go";
import { PiLockKeyLight, PiCaretLeftBold } from "react-icons/pi";
import Image from "next/image";
import logo from "../../../assets/images/6306501 1.png";
import Link from "next/link";
import "../acount.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { validateEmail, validatePassword } from "../../login/page";
import * as message from "../../../components/Message/Message";
import { useRouter } from "next/navigation";
import signup from "../../../assets/images/signup.png";



const Signup = () => {
    const router = useRouter();
    const onFinish = async (values: any) => {
        
        const valuesToSend = { ...values };
        
        // Loại bỏ trường "Retypepassword" khỏi bản sao
        delete valuesToSend.Retypepassword;
        
        console.log("Success:", valuesToSend);
        try {
            const response = await axios.post(
                "https://lhvn.online/register",
                valuesToSend
            );
            console.log(response.data);
            message.success(response?.data?.message);
            router.push("/login");
        } catch (error: any) {
            console.log("error", error);

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
    // const login = useGoogleLogin({
    //     onSuccess: (tokenResponse) => console.log(tokenResponse),
    // });

    const validateRetypePassword = ({ getFieldValue }: any) => ({
        validator(_: any, value: any) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject('Retype password does not match the password.');
        },
      });


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
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Input name"
                            prefix={<AiOutlineUser />}
                            className="bg-[#EBEBEB] p-2"
                        />
                    </Form.Item>

                    <Form.Item
                        name="gmail"
                        rules={[
                            {
                                validator: validateEmail,
                            },
                        ]}
                    >
                        <Input placeholder="Input Email" prefix={<GoMail />} />
                    </Form.Item>
                    <Form.Item
                        name="user_name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Input user name"
                            prefix={<AiOutlineUser />}
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
                        />
                    </Form.Item>

                    <Form.Item
                        name="Retypepassword"
                        rules={[
                            {
                              required: true,
                              message: 'Please retype your password.',
                            },
                            validateRetypePassword,
                          ]}
                    >
                        <Input.Password
                            placeholder="Input Retype Password"
                            prefix={<PiLockKeyLight className="" />}
                        />
                    </Form.Item>
                    <Checkbox onChange={onChange}>Remember me</Checkbox>
                    <Form.Item wrapperCol={{ span: 24 }} className="mt-2">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full  bg-[#267BFA] shadow-md rounded-[30px] mt-4"
                        >
                            Sign Up
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
                    <Form
                    name="basic"
                    wrapperCol={{
                        span: 24,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="h-[100%] grid items-center"
                    >
                    <label htmlFor="" className="font-semibold" style={{fontSize:'18px'}}>Your Name</label>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Input name"
                            prefix={<AiOutlineUser />}
                            className="bg-[#EBEBEB] p-2"
                        />
                    </Form.Item>
                    <label htmlFor="" className="font-semibold" style={{fontSize:'18px'}}>User Name</label>
                    <Form.Item
                        name="user_name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Input user name"
                            prefix={<AiOutlineUser />}
                        />
                    </Form.Item>
                    <label htmlFor="" className="font-semibold" style={{fontSize:'18px'}}>Email</label>
                    <Form.Item
                        name="gmail"
                        rules={[
                            {
                                validator: validateEmail,
                            },
                        ]}
                    >
                        <Input placeholder="Input Email" prefix={<GoMail />} />
                    </Form.Item>
                    <label htmlFor="" className="font-semibold" style={{fontSize:'18px'}}>PassWord</label>
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
                        />
                    </Form.Item>
                    <label htmlFor="" className="font-semibold" style={{fontSize:'18px'}}>Retype Password</label>
                    <Form.Item
                        name="Retypepassword"
                        rules={[
                            {
                              required: true,
                              message: 'Please retype your password.',
                            },
                            validateRetypePassword,
                          ]}
                    >
                        <Input.Password
                            placeholder="Input Retype Password"
                            prefix={<PiLockKeyLight className="" />}
                        />
                    </Form.Item>
                    <Checkbox onChange={onChange}>Remember me</Checkbox>
                    <Form.Item wrapperCol={{ span: 24 }} className="mt-2">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full  bg-[#267BFA] shadow-md rounded-[30px] mt-4"
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
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
