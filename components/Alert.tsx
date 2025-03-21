import React from "react";

type Props = {
  msg?: string | null;
  type?: "error" | "success" | "warning";
};

const Alert = ({ msg, type = "success" }: Props) => {
  return (
    <>
      {msg && (
        <div
          className={`${
            type === "success"
              ? "bg-green-500"
              : type === "error"
              ? "bg-red-500"
              : "bg-yellow-500"
          } py-3 px-3 w-full my-3 max-w-lg text-center text-white mx-auto font-bold`}
        >
          {msg}
        </div>
      )}
    </>
  );
};

export default Alert;
