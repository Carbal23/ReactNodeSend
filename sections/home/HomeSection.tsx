"use client";

import Dropzone from "@/components/Dropzone";
import Link from "next/link";
import React from "react";

const HomeSection = () => {
  return (
    <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10 gap-8">
      <Dropzone/>
      <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 ">
        <h2 className="text-3xl font-sans font-bold text-gray-800 my-4">
          Compartir archivos de forma sencilla y privada
        </h2>
        <p className="text-lg leading-loose">
          <span className="text-red-500 font-bold">ReactNodeSend</span> Te permite compartir archivos con cifrado de extremo a extremo y un archivo que es eliminado despues de ser descargado. Así que puedes mantener lo que compartes en privado y asegurarte de que tus cosas no permanezcan en línea para siempre.
        </p>
        <Link href="/signup">
          <p className="text-red-500 font-bold text-lg hover:text-red-700">Crea una cuenta para mayores beneficios</p>
        </Link>
      </div>
    </div>
  );
};

export default HomeSection;
