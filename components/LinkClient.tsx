"use client";

import { useState } from "react";
import HasPasswordForm from "@/components/HasPasswordForm";
import { paths } from "@/utils/paths";

interface LinkClientProps {
    link?: string;
    file?: string;
    password?: string;
}

const LinkClient = ({link, file, password }: LinkClientProps) => {
  const [hasPassword, setHasPassword] = useState(!!password);
  const [fileName, setFileName] = useState<string>(()=> file ? file : "");


  const handlePasswordValidated = (file:string) => {
    setHasPassword(false);
    setFileName(file);
  };

  if (hasPassword && link) {
    return <HasPasswordForm link={link} onSuccess={handlePasswordValidated} />;
  }

  return (
    <>
      <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
      <div className="flex items-center justify-center mt-10">
        <a
          href={`${process.env.NEXT_PUBLIC_API_BASE_URL}${paths.file.download}${fileName}`}
          className="bg-red-500 text-center py-6 px-10 rounded uppercase font-bold text-white cursor-pointer"
        >
          Aquí
        </a>
      </div>
    </>
  );
};

export default LinkClient;
