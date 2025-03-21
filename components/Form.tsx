import { useFileContext } from "@/context/file/usefileContext";
import React, { useState } from "react";

function Form() {
  const [hasPassword, setHasPassword] = useState(false);
  const { addPassword, addDownloads } = useFileContext();
  return (
    <div className="w-full mt-10">
      <div>
        <label className="text-lg text-gray-800">Eliminar tras:</label>
        <select
          className="appearance-none w-full mt-2 bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
          onChange={(e) => addDownloads(Number(e.target.value))}
        >
          <option value="" disabled>
            --Seleccione--
          </option>
          <option value="1">1 Descarga</option>
          <option value="5">5 Descargas</option>
          <option value="10">10 Descargas</option>
          <option value="20">20 Descargas</option>
        </select>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label className="text-lg text-gray-800 mr-2">
            Proteger con contraseña
          </label>
          <input
            type="checkbox"
            onChange={() => setHasPassword(!hasPassword)}
          />
        </div>
        {hasPassword && (
          <input
            type="password"
            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
            onChange={(e) => addPassword(e.target.value)}
            required
            placeholder="Contraseña"
          />
        )}
      </div>
    </div>
  );
}

export default Form;
