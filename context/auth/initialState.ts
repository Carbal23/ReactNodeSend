import { AuthState } from "./types";

export const initialState: AuthState = {
    token: "",
    isAuthenticated: false,
    user: null,
    error: false,
    message: null,
    loading: true,
}