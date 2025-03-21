import { createContext } from "react";
import { ContextType } from "./types";

const defaultContext: ContextType = {
    message: null,
    error: false,
    loading: false,
    name: "",
    originalName: "", 
    password: "",
    downloads: 1,
    url: "",
    author: null,
    errorFile: () => {},
    uploadFile: () => {},
    createLink: () => {},
    clearState: () => {},
    addPassword: () => {},
    addDownloads: () => {},
    uploadFileAndCreateLink: () => {},
}

const fileContext = createContext(defaultContext);

export default fileContext;