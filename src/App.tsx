import { lazy, Suspense } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//IMPORT PROVIDERS
import MonthYearProvider from "./components/providers/MonthYearProvider";
//IMPORT COMPONENTS
import Spinner from "./components/ui/spinner";

const AuthRoot = lazy(() => import("./components/roots/AuthRoot"));
const DashboardRoot = lazy(() => import("./components/roots/DashboardRoot"));
//IMPORT PAGES
const AppPage = lazy(() => import("./pages/app-page"));
const ProfilePage = lazy(() => import("./pages/profile-page"));
const LoginPage = lazy(() => import("./pages/auth/login-page"));
const RegisterPage = lazy(() => import("./pages/auth/register-page"));
const ForgotPasswordPage = lazy(
  () => import("./pages/auth/forgot-password-page"),
);
const AnalysisPage = lazy(() => import("./pages/analysis-page"));

//CREATE ROUTER
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardRoot />,
    children: [
      { index: true, element: <AppPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "analysis", element: <AnalysisPage /> },
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

function App() {
  return (
    <MonthYearProvider>
      <Suspense fallback={LoadingFallback}>
        <RouterProvider router={router} />
      </Suspense>
    </MonthYearProvider>
  );
}

export default App;

const LoadingFallback = (
  <div className="grid h-[100dvh] w-full place-items-center">
    <div>
      <Spinner className="mx-auto h-12 w-12 fill-primary dark:fill-white" />
      <p className="mt-4 text-center">Application is Loading...</p>
    </div>
  </div>
);
