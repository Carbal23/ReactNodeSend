import fileContext from "./fileContext";
import { ContextType } from "./types"
import { useContext } from "react";

export const useFileContext = () => {
    const context: ContextType = useContext(fileContext);

    if(!context) {
        throw new Error("useFileContext must be used within an FileProvider");
    }

    return context;
}