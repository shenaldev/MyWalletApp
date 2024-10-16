import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

//IMPORT LAYOUTS AND PROVIDERS
import AuthLayout from "../layouts/AuthLayout";
import { useAuthProvider } from "../providers/auth-provider";

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
