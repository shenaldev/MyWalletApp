import { toast } from "sonner";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
//IMPORT COMPONENTS
import { AlertCircle } from "lucide-react";
import LoginForm from "@/components/forms/LoginForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
//IMPORT UITLS
import getRoute from "@/lib/RouteLinks";

function LoginPage() {
  const [searchParams] = useSearchParams({ error: "" });
  const error = searchParams.get("error");

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
    </>
  );
}

export default LoginPage;
