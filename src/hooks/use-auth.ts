import { UserResponse } from "@/types/auth-types";
import axios, { AxiosResponse } from "axios";

import { useAuthProvider } from "@/providers/auth-provider";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const axiosOptions = {
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

type User = {
  email: string;
  password: string;
};

type NewUser = User & {
  name: string;
  password_confirmation: string;
};

export default function useAuth() {
  const authProvider = useAuthProvider();

  /**************************************************
   * Login user and set user data in local storage
   * @param user User
   * @param path url to login route
   * @returns axios data | error
   *************************************************/
  const login = async (user: User, path: string) => {
    return axios
      .post(`${baseURL}/${path}`, user, axiosOptions)
      .then((response: AxiosResponse<UserResponse>) => {
        if (response.status == 201) {
          if (response.data.user != null) {
            handleSuccessAuth(response.data);
            authProvider.logUser && authProvider.logUser(response.data.user);
          }
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  /**************************************************
   * Register new user and login in frontend
   * @param user form data for new user registration
   * @param path url to register route
   * @returns axios data | error
   *************************************************/
  const register = async (user: NewUser, path: string) => {
    return axios
      .post(`${baseURL}/${path}`, user, axiosOptions)
      .then((response: AxiosResponse<UserResponse>) => {
        if (response.status == 201) {
          if (response.data.user != null) {
            handleSuccessAuth(response.data);
            authProvider.logUser && authProvider.logUser(response.data.user);
          }
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  /**********************************************************
   * Logout user and remove user data from local storage
   * @param path url to logout route
   * @returns axios data | error
   *********************************************************/
  const logout = async (path: string) => {
    localStorage.removeItem("user");
    authProvider.removeUser && authProvider.removeUser();
    return axios.post(`${baseURL}/${path}`, {}, axiosOptions).then(() => {
      window.location.replace("/auth/login");
    });
  };

  /************************************************************
   * Check user token is valid and redirect to login page
   * @param path url to check token route
   * @returns axios data | error
   ************************************************************/
  const checkToken = async (path: string) => {
    return axios
      .get(`${baseURL}/${path}`, axiosOptions)
      .then((response: AxiosResponse<UserResponse>) => {
        return response;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("user");
          window.location.replace("/auth/login?error=unauthorized");
        }
      });
  };

  return { login, register, logout, checkToken };
}

/**
 * Set user data in local storage and redirect to home page
 * When user is successfully authenticated
 * @param user UserResponse
 */
function handleSuccessAuth(user: Omit<UserResponse, "token">) {
  localStorage.setItem("user", JSON.stringify(user.user));
  window.location.replace("/");
}
