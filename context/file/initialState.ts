import { FileState } from "./types";

export const initialState: FileState = {
    error: false,
    message: null,
    loading: true,
    name: "",
    originalName: "",
    password: "",
    downloads: 1,
    url: "",
    author: null,
}