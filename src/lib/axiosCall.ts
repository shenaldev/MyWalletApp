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

export const axiosCall = async ({
  method,
  urlPath,
  data,
  isBase = false,
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
    .catch((err) => {
      if (err.code == "ERR_NETWORK") {
        throw ["Something went wrong, please try again later."];
      } else if (err?.response?.status == 422) {
        const errorArray: string[] = [];
        Object.keys(err.response.data.errors).forEach((key) => {
          const error = err.response.data.errors[key][0];
          errorArray.push(error);
        });
        throw errorArray;
      } else if (err?.response?.status == 401) {
        throw err?.response;
      } else {
        throw ["Something went wrong, please try again later."];
      }
    });

  return response;
};
