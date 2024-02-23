import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// IMPORT STYLES
import "./App.css";
// IMPORT PROVIDERS
import AuthProvider from "./components/providers/AuthProvider";
//IMPORT COMPONENTS
import AuthRoot from "./components/roots/AuthRoot";
import DashboardRoot from "./components/roots/DashboardRoot";
//IMPORT PAGES
import {
  AppPage,
  ForgotPasswordPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from "./pages/Pages";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//ROUTER
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardRoot />,
    children: [
      { index: true, element: <AppPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthRoot />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
