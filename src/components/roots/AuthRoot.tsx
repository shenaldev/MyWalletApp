import { Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import AuthLayout from "../layouts/AuthLayout";

function AuthRoot() {
  const auth = useAuth();
  console.log(auth);
  return (
    <>
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    </>
  );
}

export default AuthRoot;
