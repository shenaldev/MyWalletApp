import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

function ServerErrorAlert({ errors }: { errors: string[] }) {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {errors.map((error: any, index: number) => (
          <p key={index}>{error}</p>
        ))}
      </AlertDescription>
    </Alert>
  );
}

export default ServerErrorAlert;
