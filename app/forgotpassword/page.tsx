"use client";
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { GoMail } from "react-icons/go";
import { PiLockKeyLight, PiCaretLeftBold } from "react-icons/pi";
import Image from "next/image";
import logo from "../../assets/images/6306501 1.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../signup/acount.css";
import * as message from "../../components/Message/Message";
// import { validateEmail, validatePassword} from "../login/page";
import forgot from "../../assets/images/forgot.png";
import { Rule } from 'rc-field-form/lib/interface';

interface ValidatePasswordFunction {
  (rule: Rule, value: any, callback: any): void;
}

interface ValidateEmailFunction {
  (rule: Rule, value: any, callback: any): void;
}

const Forgotpassword = () => {
  const router = useRouter();
  const [isModalRs, setIsModalRs] = useState(false);

  const onFinish = async (values: any) => {
    console.log("Success:", values);

    try {
      const response = await axios.post(
        "https://lhvn.online/resetPasswork",
        values
      );
      console.log(response.data);
      message.success(response?.data?.message);
      // router.push("/login");
      setIsModalRs(true)
    } catch (error: any) {
      message.error(error?.response?.data?.message);
    }
  };

  const validatePassword: ValidatePasswordFunction = (rule, value, callback) => {
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

  const validateEmail: ValidateEmailFunction = (rule, value, callback) => {
    if (!value) {
      callback("Please input your email.");
    } else {
      const trimmedValue = value.trim(); // Remove leading and trailing spaces
      if (trimmedValue === value) {
        const emailRegex =
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
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

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };


  const ResetPw = async (values: any) => {
    console.log("Success:", values);
    try {
      const response = await axios.patch(
        "https://lhvn.online/resetPasswork/change",
        values
      );
      console.log(response.data);
      message.success(response?.data?.message);

      router.push("/login");
    } catch (error: any) {
      message.error(error?.response?.data?.message);
    }
  }


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
            <label htmlFor="" className="font-semibold" style={{ fontSize: '18px' }}>Email</label>
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

            <Form.Item wrapperCol={{ span: 24 }} className="mt-2">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-[55px] bg-[#267BFA] shadow-md rounded-[30px] "
              >
                Send Reset Instructions
              </Button>
            </Form.Item>
          </Form>
          {isModalRs && (
            <Form
              name="basic"
              wrapperCol={{
                span: 24,
              }}
              onFinish={ResetPw}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className=""
            >
              <div className="mb-4">
                <label htmlFor="" className="font-semibold" style={{ fontSize: '18px' }}>Verification</label>
              </div>
              <Form.Item
                name="password"
              >
                <Input placeholder="Input Verification" />
              </Form.Item>
              <div className="mb-4">
                <label htmlFor="" className="font-semibold" style={{ fontSize: '18px' }}>New Password</label>
              </div>
              <Form.Item
                name="new_password"
                rules={[
                  {
                    validator: validatePassword,
                  },
                ]}
              >
                <Input.Password
                  placeholder="Input new password"
                  prefix={<PiLockKeyLight className="" />}
                  className="bg-[#EBEBEB] p-2"
                />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }} className="mt-2">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-[55px] bg-[#267BFA] shadow-md rounded-[30px] "
                >
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          )}



        </div>
      </div>

      <div className="hidden sm:block pt-28 pb-28 xl:pl-40 xl:pr-40 h-[100vh]">
        <div className="flex justify-center items-center bg-gray-300 h-[100%] rounded-[16px] md:p-16">
          <div className="grid w-[50%] h-[100%]">
            <Link href="/login" className="flex items-center h-[50%] text-2xl font-semibold">
              <PiCaretLeftBold className="ml-10 mr-8" />
              <p>Login SamNote?</p>
            </Link>
            <Image
              src={forgot}
              alt="imgForgot"
              className=""
            />
          </div>
          <div className="w-[40%] h-[100%] grid items-center pl-24">
            <div className="h-[90%] grid items-end font-semibold">
              Enter the email address you used when you joined and
              we’ll send you instructions to reset your password.
              For security reasons, we do NOT store your password.
              So rest assured that we will never send your password via email.
            </div>
            <div className="h-[100%]">
              <Form
                name="basic"
                wrapperCol={{
                  span: 24,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="h-[100%] grid content-center"
              >
                <div className="mb-4">
                  <label htmlFor="" className="font-semibold" style={{ fontSize: '18px' }}>Email Address</label>
                </div>
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

                <Form.Item wrapperCol={{ span: 24 }} className="mt-2">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full h-[55px] bg-[#267BFA] shadow-md rounded-[30px]"
                  >
                    Send Reset Instructions
                  </Button>
                </Form.Item>
              </Form>
            </div>
            {isModalRs && (
              <div>
                <Form
                  name="basic"
                  wrapperCol={{
                    span: 24,
                  }}
                  onFinish={ResetPw}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  className="h-[100%] grid content-center"
                >
                  <div className="mb-4">
                    <label htmlFor="" className="font-semibold" style={{ fontSize: '18px' }}>Verification</label>
                  </div>
                  <Form.Item
                    name="password"
                    rules={[
                    ]}
                  >
                    <Input placeholder="Input Verification" />

                  </Form.Item>
                  <div className="mb-4">
                    <label htmlFor="" className="font-semibold" style={{ fontSize: '18px' }}>New Password</label>
                  </div>
                  <Form.Item
                    name="new_password"
                    rules={[
                      {
                        validator: validatePassword,
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Input new password"
                      prefix={<PiLockKeyLight className="" />}
                      className="bg-[#EBEBEB] p-2"
                    />
                  </Form.Item>


                  <Form.Item wrapperCol={{ span: 24 }} className="mt-2">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-full h-[55px] bg-[#267BFA] shadow-md rounded-[30px]"
                    >
                      Reset Password
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default Forgotpassword;
