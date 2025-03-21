"use client";

import { useCallback, useEffect, useMemo, useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import { initialState } from "./initialState";
import { AuthActionTypes, NewUser, User } from "./types";
import { useApi } from "@/hooks/useApi";
import { paths } from "@/utils/paths";
import { useTokenAuth } from "@/hooks/useTokenAuth";

type Props = {
  children: React.ReactElement;
};

const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { token, setToken } = useTokenAuth();
  const { get, post } = useApi();

  const userAuthenticated = useCallback(() => {
    if (!token) {
      dispatch({ type: AuthActionTypes.CLEAN_ALERT });
      return;
    }

    get<{ user: User }>(paths.auth.me)
      .then((res) => {
        dispatch({
          type: AuthActionTypes.CHECK_AUTH,
          payload: res.user,
        });
      })
      .catch((e) => {
        console.error(e);
        localStorage.removeItem("token");
        dispatch({ type: AuthActionTypes.LOGOUT });
      });
  }, [token, get]);

  useEffect(() => {
    userAuthenticated();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userLogin = useCallback(
    (data: { email: string; password: string }) => {
      post<{ email: string; password: string }, { token: string; user: User }>(
        paths.auth.login,
        data
      )
        .then((res) => {
          setToken(res.token);
          dispatch({
            type: AuthActionTypes.LOGIN,
            payload: res,
          });
        })
        .catch((error) => {
          console.error("Error al loguearse", error.message);
          dispatch({
            type: AuthActionTypes.ERROR,
            payload: error.message ?? "Error al loguearse",
          });
        })
        .finally(() =>
          setTimeout(() => {
            dispatch({ type: AuthActionTypes.CLEAN_ALERT });
          }, 3000)
        );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const userSignUp = useCallback(
    (data: { name: string; email: string; password: string }) => {
      post<NewUser, { msg: string }>(paths.user.newUser, data)
        .then((res) => {
          console.log(res.msg);
          dispatch({
            type: AuthActionTypes.REGISTER,
            payload: res.msg ? res.msg : "Usuario registrado correctamente",
          });
        })
        .catch((error) => {
          console.error("Error al registrarse", error.message);
          dispatch({
            type: AuthActionTypes.ERROR,
            payload: error.message ?? "Error al registrarse",
          });
        })
        .finally(() =>
          setTimeout(() => {
            dispatch({ type: AuthActionTypes.CLEAN_ALERT });
          }, 3000)
        );
    },
    [post]
  );

  const userLogout = useCallback(() => {
    dispatch({ type: AuthActionTypes.LOGOUT });
  }, []);

  const memoValue = useMemo(() => {
    return {
      isAuthenticated: state.isAuthenticated,
      token: state.token,
      user: state.user,
      error: state.error,
      message: state.message,
      loading: state.loading,
      userAuthenticated,
      userSignUp,
      userLogin,
      userLogout,
    };
  }, [
    state.isAuthenticated,
    state.message,
    state.token,
    state.user,
    state.error,
    state.loading,
    userAuthenticated,
    userSignUp,
    userLogin,
    userLogout,
  ]);

  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
