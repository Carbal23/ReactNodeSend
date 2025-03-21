"use client";

import { useCallback, useMemo, useReducer } from "react";
import AuthContext from "./fileContext";
import fileReducer from "./fileReducer";
import { initialState } from "./initialState";
import { CreateLink, FileActionTypes } from "./types";
import { useApi } from "@/hooks/useApi";
import { paths } from "@/utils/paths";

type Props = {
  children: React.ReactElement;
};

const FileProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(fileReducer, initialState);
  const { post } = useApi();

  const errorFile = useCallback((msg: string) => {
    dispatch({
      type: FileActionTypes.ERROR,
      payload: msg,
    });

    setTimeout(() => {
      dispatch({ type: FileActionTypes.CLEAN_ALERT });
    }, 4000);
  }, []);

  const uploadFile = useCallback(
    (acceptedFiles: File[]): void => {
      dispatch({ type: FileActionTypes.LOADING });

      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      post<FormData, { file: string }>(paths.file.upload, formData)
        .then((res) => {
          dispatch({
            type: FileActionTypes.UPLOAD_FILE,
            payload: {
              name: res.file,
              originalName: acceptedFiles[0].name,
            },
          });
        })
        .catch((error) => {
          console.error(error);
          dispatch({
            type: FileActionTypes.ERROR,
            payload: "Hubo un error al subir el archivo",
          });
          setTimeout(() => {
            dispatch({ type: FileActionTypes.CLEAN_ALERT });
          }, 4000);
        });
    },
    [post]
  );

  const createLink = useCallback(() => {
    const data = {
      name: state.name,
      original_name: state.originalName,
      downloads: state.downloads,
      password: state.password,
      author: state.author,
    };

    post<CreateLink, { msg: string }>(paths.link.create, data)
      .then((res) => {
        console.log(res);
        dispatch({
          type: FileActionTypes.CREATE_LINK,
          payload: res.msg,
        });
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: FileActionTypes.ERROR,
          payload: "Hubo un error al crear el enlace",
        });
      });
  }, [
    post,
    state.name,
    state.originalName,
    state.downloads,
    state.password,
    state.author,
  ]);

  const clearState = useCallback(() => {
    dispatch({ type: FileActionTypes.CLEAN_STATE });
  }, []);

  const addPassword = useCallback((password: string) => {
    dispatch({ type: FileActionTypes.ADD_PASSWORD, payload: password });
  }, []);

  const addDownloads = useCallback((downloads: number) => {
    dispatch({ type: FileActionTypes.ADD_DOWNLOADS, payload: downloads });
  }, []);

  const uploadFileAndCreateLink = useCallback(
    (acceptedFiles: File[]) => {
      dispatch({ type: FileActionTypes.LOADING });

      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      post<FormData, { file: string }>(paths.file.upload, formData)
        .then((res) => {
          dispatch({
            type: FileActionTypes.UPLOAD_FILE,
            payload: {
              name: res.file,
              originalName: acceptedFiles[0].name,
            },
          });
          const data = {
            name: res.file,
            original_name: acceptedFiles[0].name,
            downloads: state.downloads,
            password: state.password,
          };
          post<CreateLink, { msg: string }>(paths.link.create, data)
            .then((res) => {
              dispatch({
                type: FileActionTypes.CREATE_LINK,
                payload: res.msg,
              });
            })
            .catch((error) => {
              console.error(error);
              dispatch({
                type: FileActionTypes.ERROR,
                payload: "Hubo un error al crear el enlace",
              });
            });
        })
        .catch((error) => {
          console.error(error);
          dispatch({
            type: FileActionTypes.ERROR,
            payload: "Hubo un error al subir el archivo",
          });
          setTimeout(() => {
            dispatch({ type: FileActionTypes.CLEAN_ALERT });
          }, 4000);
        });
    },
    [post, state.downloads, state.password, state.author]
  );

  const memoValue = useMemo(() => {
    return {
      error: state.error,
      message: state.message,
      loading: state.loading,
      name: state.name,
      originalName: state.originalName,
      password: state.password,
      downloads: state.downloads,
      url: state.url,
      author: state.author,
      errorFile,
      uploadFile,
      createLink,
      clearState,
      addPassword,
      addDownloads,
      uploadFileAndCreateLink,
    };
  }, [
    state.error,
    state.message,
    state.loading,
    state.name,
    state.originalName,
    state.password,
    state.downloads,
    state.url,
    state.author,
    errorFile,
    uploadFile,
    createLink,
    clearState,
    addPassword,
    addDownloads,
    uploadFileAndCreateLink,
  ]);

  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};

export default FileProvider;
