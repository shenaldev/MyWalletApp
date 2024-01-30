import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
//IMPORT PROVIDERS
import { useAuth } from "../providers/AuthProvider";

function DashboardRoot() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/auth/login", { replace: true });
    }
  }, [user, navigate]);

  return <Outlet />;
}

export default DashboardRoot;
