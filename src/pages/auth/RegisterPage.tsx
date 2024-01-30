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
//IMPORT UTILS
import getRoute from "@/lib/RouteLinks";

function RegisterPage() {
  return (
    <div className="container mt-8 flex justify-center pb-8">
      <Card className="min-w-[320px] md:w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          {/* Social Media Login Buttons */}
          <SocialButtons action="Signup" />
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              to={getRoute("login")}
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterPage;
