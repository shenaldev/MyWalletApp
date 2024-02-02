import { useState } from "react";
import { Link } from "react-router-dom";
//IMPORT COMPONENTS
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "@/components/forms/RegisterForm";
import SocialButtons from "@/components/elements/SocialButtons";
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
      <div className="container mt-8 flex justify-center pb-8">
        <Card className="min-w-[320px] md:w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Create an Account</CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterForm
              isMailVerified={isMailVerified}
              onSubmit={onFormSubmitHandler}
            />
            {/* Social Media Login Buttons */}
            <SocialButtons action="Signup" />
          </CardContent>
          <CardFooter>
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                to={getRoute("login")}
                className="font-semibold text-primary hover:underline"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
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
