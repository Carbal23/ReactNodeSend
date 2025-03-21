import { useCallback, useEffect } from "react";
import { useTokenAuth } from "./useTokenAuth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions<T> {
  endpoint: string;
  method?: RequestMethod;
  body?: T;
  headers?: HeadersInit;
}

export function useApi() {
  const { token, setToken } = useTokenAuth();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [setToken]);

  const request = useCallback(
    async <T, R = unknown>({ endpoint, method = "GET", body, headers }: FetchOptions<T>): Promise<R> => {
      try {
        const isFormData = body instanceof FormData;

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method,
          headers: {
            ...(!isFormData && { "Content-Type": "application/json" }),
            ...(token && { Authorization: `Bearer ${token}` }),
            ...headers,
          },
          body: isFormData ? body : body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || "Error desconocido en la solicitud");
        }

        return (await response.json()) as R;
      } catch (error) {
        console.error("API Request Error:", error);
        throw error;
      }
    },
    [token]
  );

  return {
    get: <R = unknown>(endpoint: string, headers?: HeadersInit) =>
      request<void, R>({ endpoint, method: "GET", headers }),

    post: <T, R = unknown>(endpoint: string, body: T, headers?: HeadersInit) =>
      request<T, R>({ endpoint, method: "POST", body, headers }),

    put: <T, R = unknown>(endpoint: string, body: T, headers?: HeadersInit) =>
      request<T, R>({ endpoint, method: "PUT", body, headers }),

    patch: <T, R = unknown>(endpoint: string, body: T, headers?: HeadersInit) =>
      request<T, R>({ endpoint, method: "PATCH", body, headers }),

    delete: <R = unknown>(endpoint: string, headers?: HeadersInit) =>
      request<void, R>({ endpoint, method: "DELETE", headers }),
  };
}
