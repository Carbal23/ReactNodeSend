export type CreateLink = {
  name: string;
  original_name: string;
  downloads: number;
  password: string;
}

export type ContextType = {
  message: string | null;
  error: boolean;
  loading: boolean;
  name: string;
  originalName: string;
  password: string;
  downloads: number;
  url: string;
  author: string | null;
  errorFile: (msg:string) => void;
  uploadFile: (acceptedFiles: File[]) => void;
  createLink: () => void;
  clearState: () => void;
  addPassword: (password: string) => void;
  addDownloads: (downloads: number) => void;
  uploadFileAndCreateLink(acceptedFiles: File[]): void;
};

export type FileState = {
  error: boolean;
  message: string | null;
  loading: boolean;
  name: string;
  originalName: string;
  password: string;
  downloads: number;
  url: string;
  author: string | null;
};

export type FileAction =
  | { type: "ERROR"; payload: string }
  | { type: "CLEAN_ALERT" }
  | { type: "LOADING" }
  | { type: "UPLOAD_FILE"; payload: { name: string; originalName: string } }
  | { type: "CREATE_LINK"; payload: string }
  | { type: "CLEAN_STATE" }
  | { type: "ADD_PASSWORD"; payload: string }
  | { type: "ADD_DOWNLOADS"; payload: number };

export enum FileActionTypes {
  ERROR = "ERROR",
  CLEAN_ALERT = "CLEAN_ALERT",
  LOADING = "LOADING",
  UPLOAD_FILE = "UPLOAD_FILE",
  DELETE_FILE = "DELETE_FILE",
  CREATE_LINK = "CREATE_LINK",
  CLEAN_STATE = "CLEAN_STATE",
  ADD_PASSWORD = "ADD_PASSWORD",
  ADD_DOWNLOADS = "ADD_DOWNLOADS",
}
