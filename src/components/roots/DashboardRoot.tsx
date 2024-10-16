import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "sonner";
//IMPORT PROVIDERS
import { useAuth } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { axiosCall } from "@/lib/axiosCall";
import ApiUrls from "@/lib/ApiUrls";

function DashboardRoot() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      return navigate("/auth/login", { replace: true });
    }
  }, [user, navigate]);

  /**
   * CHECK USER TOKEN IS VALID IF USER LOGGED IN
   * ELSE REDIRECT TO LOGIN PAGE
   */
  const {
    error,
    isError,
    refetch,
  }: { error: any; isError: boolean; refetch: () => void } = useQuery({
    queryKey: ["checkToken"],
    queryFn: async () => {
      return await axiosCall({
        method: "GET",
        urlPath: ApiUrls.auth.checkToken,
      });
    },
    retry(failureCount, error) {
      if (error.status === 401) return false;
      else if (failureCount < 2) return true;
      else return false;
    },
  });

  useEffect(() => {
    refetch();
  }, [navigate, refetch]);

  // RETURN EMPTY PAGE IF USER IS NULL
  if (user == null) return "";

  if (isError) {
    if (error?.status === 401) {
      logout();
      window.location.replace("/auth/login?error=unauthorized");
      return;
    }
  }

  return (
    <>
      <Outlet />
      <Toaster closeButton={true} richColors={true} />
    </>
  );
}

export default DashboardRoot;
