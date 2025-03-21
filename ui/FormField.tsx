import React from "react";
import { Field, ErrorMessage } from "formik";

type Props = {
  name: string;
  type: string;
  placeholder: string;
};

const FormField = ({ name, type, placeholder }: Props) => {
  const formatedName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-black text-sm font-bold mb-2">
        {formatedName}
      </label>
      <Field
        type={type}
        id={name}
        name={name} 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs mt-1"
      />
    </div>
  );
};

export default FormField;
