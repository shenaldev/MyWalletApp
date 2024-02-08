import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

function ServerErrorAlert({ errors }: { errors: [any] }) {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <ul>
          {errors.map((error, index) => (
            <li key={index} className="text-sm">
              {error}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}

export default ServerErrorAlert;
