"use client";

import Alert from "@/components/Alert";
import { useFileContext } from "@/context/file/usefileContext";
import HomeSection from "@/sections/home/HomeSection";

export default function Home() {
  const { message, error, url } = useFileContext();
  const type = error ? "error" : "success";

  const FRONT_URL = process.env.NEXT_PUBLIC_FRONT_URL as string;

  return (
    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
      {url ? (
        <>
          <p className="text-center text-2xl">
            <span className="font-bold text-red-700 text-3xl uppercase">
              Tu url es:{" "}
            </span>
            {`${FRONT_URL}/link/${url}`}
          </p>
          <button
            type="button"
            className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer mt-8"
            onClick={() =>
              navigator.clipboard.writeText(`${FRONT_URL}/link/${url}`)
            }
          >
            Copiar enlace
          </button>
        </>
      ) : (
        <>
          <Alert msg={message} type={type} />
          <HomeSection />
        </>
      )}
    </div>
  );
}
