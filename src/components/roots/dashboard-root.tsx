import { useEffect } from "react";

import useAuth from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

import { useAuthProvider } from "../providers/auth-provider";

function DashboardRoot() {
  const { checkToken } = useAuth();
  const { user } = useAuthProvider();
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
  const { error, isError }: { error: any; isError: boolean } = useQuery({
    queryKey: ["checkToken"],
    queryFn: async () => {
      return await checkToken("api/v1/check-token");
    },
    retry(failureCount, error) {
      if (error.status === 401) return false;
      else if (failureCount < 2) return true;
      else return false;
    },
    enabled: user !== null,
  });

  // RETURN EMPTY PAGE IF USER IS NULL
  if (user == null) return "";

  if (isError) {
    if (error?.status === 401) {
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
