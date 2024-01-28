import React from "react";
import ReactDOM from "react-dom/client";
// IMPORT STYLES
import "./index.css";
import "./App.css";
import AuthProvider from "./components/providers/AuthProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardRoot from "./components/roots/DashboardRoot";
import AppPage from "./pages/AppPage";
import AuthRoot from "./components/roots/AuthRoot";

//ROUTER
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardRoot />,
    children: [{ index: true, element: <AppPage /> }],
  },
  {
    path: "/auth/login",
    element: <AuthRoot />,
    children: [{ index: true, element: <h1>Login Page</h1> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
