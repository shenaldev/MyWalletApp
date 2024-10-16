import axios, { AxiosError } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;

type axiosProps = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  urlPath: string;
  data?: any;
  isBase?: boolean;
  isAuthRoute?: boolean;
};

export const axiosCall = async ({
  method,
  urlPath,
  data,
  isBase = false,
  isAuthRoute = false,
}: axiosProps) => {
  const url = `${isBase ? baseUrl : apiUrl}${apiVersion}${urlPath}`;

  const response = await axios({
    method,
    url,
    data: data,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err: AxiosError) => {
      /**********************************
       * Handle Server Errors With Status Code Of 401
       * @returns Redirects To Login Page
       ************************************/
      if (err?.response?.status == 401) {
        if (!isAuthRoute) {
          localStorage.removeItem("user");
          window.location.href = "/auth/login?error=unauthorized";
          return;
        }
      }

      throw err;
    });

  return response;
};
