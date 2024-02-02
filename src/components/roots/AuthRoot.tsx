import { Toaster } from "sonner";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
//IMPORT LAYOUTS AND PROVIDERS
import AuthLayout from "../layouts/AuthLayout";
import { useAuth } from "../providers/AuthProvider";

function AuthRoot() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user != null) {
      navigate("/", { replace: true });
      return;
    }
  }, [auth]);

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
