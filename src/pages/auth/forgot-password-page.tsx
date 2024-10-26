import { useState } from "react";

import { Link } from "react-router-dom";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPasswordForm from "@/features/forgot-password/reset-password-form";
import SendResetMailForm from "@/features/forgot-password/send-reset-mail-form";

import getRoute from "@/lib/route-links";

function ForgotPasswordPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          {email
            ? "Check your email for the password reset code"
            : "Enter your email to receive a password reset code."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!email && !isSuccess && <SendResetMailForm setEmail={setEmail} />}
        {email && !isSuccess && (
          <ResetPasswordForm email={email} setIsSuccess={setIsSuccess} />
        )}
        {isSuccess && (
          <>
            <Alert className="mt-4 bg-green-100 text-slate-900">
              <AlertDescription>
                You'r password has been reset successfully.
              </AlertDescription>
            </Alert>
            <Link
              to={getRoute("login")}
              className="dark:text-white block text-center mt-8 hover:underline"
            >
              <Button className="w-full">Login</Button>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default ForgotPasswordPage;
