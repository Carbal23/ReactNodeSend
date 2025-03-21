"use client";
import { useApi } from "@/hooks/useApi";
import { paths } from "@/utils/paths";
import React, { useState } from "react";
import Alert from "./Alert";


interface HasPasswordFormProps {
  link: string;
  onSuccess: (file: string) => void;
}

function HasPasswordForm({ link, onSuccess }: HasPasswordFormProps) {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { post } = useApi();
  const type = error ? "error" : "success";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      password,
    };
    post<{ password: string }, { file: string }>(
      paths.link.validatePassword + link,
      data
    )
      .then((res) => {
        onSuccess(res.file);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  return (
    <div className="flex flex-col justify-center mt-5 items-center">
      <h2 className="text-2xl text-center text-gray-700 mb-10">
        Archivo protegido con contraseña, por favor ingresala para continuar con
        la descarga
      </h2>
      <Alert msg={error} type={type} />
      <div className="w-full max-w-lg">
        <form
          className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-black  text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-4"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password del archivo"
            />
            <button
              type="submit"
              className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer"
            >
              Validar password...
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HasPasswordForm;
