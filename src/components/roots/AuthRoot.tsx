import { Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import AuthLayout from "../layouts/AuthLayout";
import { Toaster } from "sonner";

function AuthRoot() {
  const auth = useAuth();
  console.log(auth);
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
