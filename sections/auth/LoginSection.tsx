"use client";

import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import FormField from "@/ui/FormField";
import { loginValidationSchema } from "@/validations/loginValidations";
import { loginInitialValues } from "@/utils/initialValuesForm";
import { useAuthContext } from "@/context/auth/useAuthContext";
import { useRouter } from "next/navigation";

const LoginSection = () => {
  const { isAuthenticated, userLogin  } = useAuthContext();
  const router = useRouter();

  useEffect(()=>{
    if(isAuthenticated){
      router.push("/")
    }
  },[isAuthenticated, router])

  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-lg">
        <Formik
          initialValues={loginInitialValues}
          validationSchema={loginValidationSchema}
          onSubmit={(userData) => {
            userLogin(userData);
          }}
        >
          {() => (
            <Form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
              <FormField name="email" type="email" placeholder="Your email" />
              <FormField
                name="password"
                type="password"
                placeholder="Your password"
              />

              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer"
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginSection;
