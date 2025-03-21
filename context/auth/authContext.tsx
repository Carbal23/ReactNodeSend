import { createContext } from "react";
import { ContextType } from "./types";

const defatulContext: ContextType = {
    token: "",
    user: null,
    isAuthenticated: false,
    message: null,
    error: false,
    loading: true,
    userAuthenticated: () => {},
    userSignUp: () => {},
    userLogin: () => {},
    userLogout: () => {},
}

const authContext = createContext(defatulContext);

export default authContext;