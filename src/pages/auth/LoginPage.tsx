import { Link } from "react-router-dom";
//IMPORT COMPONENTS
import LoginForm from "@/components/forms/LoginForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
//IMPORT UITLS
import getRoute from "@/lib/RouteLinks";
import SocialButtons from "@/components/elements/SocialButtons";

function LoginPage() {
  return (
    <div className="container mt-8 flex justify-center">
      <Card className="min-w-[320px] md:w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          {/* Social Media Login Buttons */}
          <SocialButtons />
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-between text-sm">
            <Link
              to={getRoute("register")}
              className="text-blue-500 hover:underline"
            >
              Create Account
            </Link>
            <Link
              to={getRoute("forgot-password")}
              className="text-blue-500 hover:underline"
            >
              Forgot Password
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
