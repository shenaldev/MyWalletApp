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
      if (err.response) {
        setError(err.response.data);
        setStatusCode(err.response.status);
        return err;
      } else if (err.request) {
        setError("Network Error");
        setStatusCode(500);
      } else {
        setError(err.message);
        setStatusCode(500);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const cancel = () => {
    controller?.abort();
  };

  return { isLoading, data, error, statusCode, fetch, cancel };
}
