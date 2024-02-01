import ApiUrls from "@/lib/ApiUrls";
import useAxios from "./useAxios";
import { useEffect } from "react";

export default function useUnauthorizedHandler(statusCode: number) {
  if (statusCode == 401) {
    const { isLoading, fetch } = useAxios();
    fetch({ method: "POST", urlPath: ApiUrls.auth.clearCookies });

    useEffect(() => {
      if (!isLoading) {
        window.location.href = "/auth/login?error=unauthorized";
      }
    }, [isLoading]);
  }
}
