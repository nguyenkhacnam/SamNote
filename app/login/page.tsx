'use client'
import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const page = () => {
    return (
        <div>
            page
            <GoogleOAuthProvider clientId="812888106047-eu7o2somicm7ogenhodihh1jpbjc9a7c.apps.googleusercontent.com">
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
    );
};

export default page;
