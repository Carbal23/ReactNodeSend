"use client";

import React from "react";
import SignupSection from "@/sections/auth/SignupSection";
import Alert from "@/components/Alert";
import { useAuthContext } from "@/context/auth/useAuthContext";

const SignUpPage = () => {
  const { message, error } = useAuthContext();
  const type = error ? "error" : "success";
  
  return (
    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
      <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
        Sign up
      </h2>
      <Alert msg={message} type={type} />
      <SignupSection />
    </div>
  );
};

export default SignUpPage;
