"use client";

import React from "react";
import { Formik, Form } from "formik";
import FormField from "@/ui/FormField";
import { signupValidationSchema } from "@/validations/signupValidations";
import { signupInitialValues } from "@/utils/initialValuesForm";
import { useAuthContext } from "@/context/auth/useAuthContext";

const SignUpSection = () => {
  const { userSignUp } = useAuthContext();
  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-lg">
        <Formik
          initialValues={signupInitialValues}
          validationSchema={signupValidationSchema}
          onSubmit={(userData) => {
            userSignUp(userData);
          }}
        >
          {( ) => (
            <Form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
              <FormField name="name" type="text" placeholder="Your name" />
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
                  Sign up
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpSection;
