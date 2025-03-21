import { useAuthContext } from "@/context/auth/useAuthContext";
import { useFileContext } from "@/context/file/usefileContext";
import React, { useCallback, useEffect, useState } from "react";
import { FileRejection, FileWithPath, useDropzone } from "react-dropzone";
import Form from "./Form";

const Dropzone = () => {
  const { loading, errorFile, uploadFileAndCreateLink, clearState } =
    useFileContext();
  const { isAuthenticated } = useAuthContext();
  const [selectedFiles, setSelectedFiles] = useState<FileWithPath[]>([]);

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      const errorMsg = isAuthenticated
        ? "El archivo es superior a 10MB"
        : "El archivo es superior a 1MB, obten una cuenta para poder subir archivos más grandes";

      errorFile(errorMsg);
      console.error("Archivo no subido", fileRejections);
    },
    [isAuthenticated, errorFile]
  );

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
    // uploadFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    maxSize: isAuthenticated ? 1024 * 1024 * 10 : 1024 * 1024,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      setSelectedFiles([]);
      clearState();
    }
  }, [isAuthenticated, clearState]);

  const files = selectedFiles.map((file) => (
    <li
      key={file.path}
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded w-[90%] max-w-[90%] mx-auto"
    >
      <p className="font-bold text-xl truncate overflow-hidden whitespace-nowrap">
        {file.path}
      </p>
      <p className="text-sm text-gray-500">
        {(file.size / Math.pow(1024, 2)).toFixed(2)} MB
      </p>
    </li>
  ));

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col justify-center items-center border-dashed border-2 border-gray-400 bg-gray-100 rounded-lg lg:max-w-[70%] lg:min-w-[400px]">
      {selectedFiles.length > 0 ? (
        <div className="my-10 w-[90%] max-w-[90%] mx-auto">
          <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
          <ul>{files}</ul>
          {loading ? (
            <p className="my-10 text-center text-gray-600">
              Subiendo archivo...
            </p>
          ) : (
            <>
              {isAuthenticated && <Form />}
              <button
                type="button"
                className="bg-blue-700 w-full hover:bg-blue-900 px-5 py-3 rounded-lg text-white font-bold mt-5"
                onClick={() => uploadFileAndCreateLink(selectedFiles)}
              >
                Crear enlace
              </button>
              <button
                type="button"
                className="bg-red-500 w-full hover:bg-red-700 px-5 py-3 rounded-lg text-white font-bold mt-5"
                onClick={() => {
                  setSelectedFiles([]);
                  clearState();
                }}
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      ) : (
        <div
          {...getRootProps({
            className: "dropzone w-[90%] max-w-[90%] mx-auto py-32",
          })}
        >
          <input className="h-100" {...getInputProps()} />
          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">
              Suelta el archivo
            </p>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600">
                Arrastra tu archivo aquí
              </p>
              <p className="text-2xl text-gray-600">ó</p>
              <button
                className="bg-blue-700 w-full hover:bg-blue-900 px-5 py-3 rounded-lg text-white font-bold mt-5"
                type="button"
              >
                Selecciona un archivo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
