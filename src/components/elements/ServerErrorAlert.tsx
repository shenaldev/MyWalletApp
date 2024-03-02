import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { cn } from "@/lib/utils";

type ServerErrorAlertProps = {
  errors: Error | any[] | null;
  className?: string;
};

function ServerErrorAlert({ errors, className }: ServerErrorAlertProps) {
  const alertClasses = cn("", className);

  const errorList = Array.isArray(errors)
    ? errors.map((error, index) => (
        <li key={index} className="text-sm">
          {error}
        </li>
      ))
    : null;

  errors == null || (typeof Error && <li>Unexpected error occurred!</li>);

  return (
    <Alert variant="destructive" className={alertClasses}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <ul>{errorList}</ul>
      </AlertDescription>
    </Alert>
  );
}

export default ServerErrorAlert;
