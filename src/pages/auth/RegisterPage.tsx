import { useState } from "react";
import { Link } from "react-router-dom";
//IMPORT COMPONENTS
import RegisterForm from "@/components/forms/RegisterForm";
import EmailVerificationDialog from "@/components/elements/dialogs/EmailVerificationDialog";
//IMPORT UTILS
import getRoute from "@/lib/RouteLinks";

function RegisterPage() {
  const [isMailVerified, setIsMailVerified] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string>("");

  function onFormSubmitHandler({ email }: { email: string }) {
    if (!isMailVerified) {
      setEmail(email);
      setOpen(true);
    }
  }

  function onEmailVerifyHandler() {
    setIsMailVerified(true);
    setOpen(false);
  }

  return (
    <>
      <RegisterForm
        isMailVerified={isMailVerified}
        onSubmit={onFormSubmitHandler}
      />
      {/* Page Footer */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-200">
        Do you have an account?{" "}
        <Link
          to={getRoute("login")}
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>

      <EmailVerificationDialog
        open={open}
        setOpen={setOpen}
        email={email}
        onVerify={onEmailVerifyHandler}
      />
    </>
  );
}

export default RegisterPage;
