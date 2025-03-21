import { FileAction, FileState } from "./types";

const fileReducer = (state: FileState, action: FileAction): FileState => {
  switch (action.type) {
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
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "UPLOAD_FILE":
      return {
        ...state,
        name: action.payload.name,
        originalName: action.payload.originalName,
        loading: false,
        error: false,
      };
    case "CREATE_LINK":
      return {
        ...state,
        loading: false,
        error: false,
        url: action.payload,
      };
    case "CLEAN_STATE":
      return {
        ...state,
        name: "",
        originalName: "",
        downloads: 1,
        password: "",
        url: "",
        author: null,
        error: false,
        message: null,
        loading: false,
      };
    case "ADD_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "ADD_DOWNLOADS":
      return {
        ...state,
        downloads: action.payload,
      };
    default:
      return state;
  }
};

export default fileReducer;
