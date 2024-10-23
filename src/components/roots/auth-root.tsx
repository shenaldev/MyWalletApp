import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

import { useAuthProvider } from "@/providers/auth-provider";

import AuthLayout from "../layouts/auth-layout";

function AuthRoot() {
  const { user } = useAuthProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      navigate("/", { replace: true });
      return;
    }
  }, [navigate, user]);

  return (
    <>
      <AuthLayout>
        <Outlet />
      </AuthLayout>
      <Toaster richColors={true} closeButton={true} />
    </>
  );
}

export default AuthRoot;
