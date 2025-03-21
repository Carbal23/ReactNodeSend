import { useContext } from "react"
import { ContextType } from "./types"
import authContext from "./authContext"

export const useAuthContext = () => {
    const context: ContextType = useContext(authContext);

    if(!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }

    return context;
}