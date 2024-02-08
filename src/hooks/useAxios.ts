import { useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;

type axiosProps = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  urlPath: string;
  data?: any;
  isBase?: boolean;
};

export default function useAxios() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [controller, setController] = useState<AbortController | null>(null);

  const fetch = async ({
    method,
    urlPath,
    data,
    isBase = false,
  }: axiosProps) => {
    const url = `${isBase ? baseUrl : apiUrl}${apiVersion}${urlPath}`;
    setIsLoading(true);
    setData(null);
    setError(null);
    setStatusCode(null);

    try {
      const ctrl = new AbortController();
      setController(ctrl);

      const response = await axios({
        method,
        url,
        data: data,
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        signal: controller?.signal,
      });
      setData(response.data);
      return response.data;
    } catch (err: any) {
      if (err.name === "CanceledError")
        return console.log("Request was aborted");
      const errorList = errorHandler(err);
      setError(errorList);
      setStatusCode(err?.response?.status || 500);
      return err;
    } finally {
      setIsLoading(false);
    }
  };

  const cancel = () => {
    controller?.abort();
  };

  return { isLoading, data, error, statusCode, fetch, cancel };
}

function errorHandler(err: any) {
  if (err.code == "ERR_NETWORK") {
    return ["Something went wrong, please try again later."];
  } else if (err?.response?.status == 422) {
    const errorArray: string[] = [];
    Object.keys(err.response.data.errors).forEach((key) => {
      const error = err.response.data.errors[key][0];
      errorArray.push(error);
    });
    return errorArray;
  } else if (err?.response?.status == 401) {
    return [err?.response?.data?.message];
  } else {
    return ["Something went wrong, please try again later."];
  }
}
