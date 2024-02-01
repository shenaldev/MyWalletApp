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

  const fetch = async ({
    method,
    urlPath,
    data,
    isBase = false,
  }: axiosProps) => {
    const url = `${isBase ? baseUrl : apiUrl}${apiVersion}${urlPath}`;
    setIsLoading(true);
    try {
      const response = await axios({
        method,
        url,
        data: data,
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data);
    } catch (errors: any) {
      setError(errors);
      if (errors.code == "ERR_NETWORK") {
        setStatusCode(500);
      } else {
        setStatusCode(errors?.response?.status);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, error, statusCode, fetch };
}
