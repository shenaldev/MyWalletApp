import { Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

function AuthRoot() {
  const auth = useAuth();
  console.log(auth);
  return <Outlet />;
}

export default AuthRoot;
