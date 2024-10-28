import { useEffect } from "react";

import useOAuthValidation from "@/hooks/use-oauth-validation";
import { AlertCircle } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import LoadingDialog from "@/components/dialogs/loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LoginForm from "@/features/login/login-form";

import getRoute from "@/lib/route-links";

function LoginPage() {
  const [searchParams] = useSearchParams({ error: "" });
  const error = searchParams.get("error");
  const { hash } = useLocation();
  const { isAuthenticating } = useOAuthValidation(hash);

  useEffect(() => {
    if (error == "unauthorized") {
      toast.error("Your session has expired. Please log in again.");
    }
  }, [error, searchParams]);

  return (
    <>
      {/* IF Unauth Error Display Alert */}
      {error == "unauthorized" && (
        <Alert variant="destructive" className="mb-4 py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Session</AlertTitle>
          <AlertDescription className="text-sm">
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
      )}
      <LoginForm />
      {/* Page Footer */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-200">
        Don't have an account?{" "}
        <Link
          to={getRoute("register")}
          className="font-medium text-primary hover:underline"
        >
          Sign up
        </Link>
      </p>
      <LoadingDialog
        open={isAuthenticating}
        className="h-1/2 bg-black"
        text="Authenticating... Please wait do not close this window."
      />
    </>
  );
}

export default LoginPage;
