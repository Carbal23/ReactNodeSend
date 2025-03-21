import { AuthAction, AuthState} from "./types";

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
        error: false,
        loading: false,
      };
    case "REGISTER":
      return {
        ...state,
        message: action.payload,
        error: false,
        loading: false,
      };
    case "CHECK_AUTH":
      return {
        ...state,
        token: localStorage.getItem("token") as string,
        isAuthenticated: true,
        user: action.payload,
        error: false,
        loading: false,
      };
    case "ERROR":
      return {
        ...state,
        error: true,
        message: action.payload,
        loading: false,
      };
    case "CLEAN_ALERT":
      return {
        ...state,
        error: false,
        message: null,
        loading: false,
      }
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        isAuthenticated: false,
        user: null,
        error: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;