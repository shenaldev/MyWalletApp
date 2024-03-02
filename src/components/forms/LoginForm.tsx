import * as zod from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
//IMPORT COMPONENTS
import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import { InputField } from "./elements/form-elements";
import ServerErrorAlert from "../elements/ServerErrorAlert";
//IMPORT HOOKS LIBS
import ApiUrls from "@/lib/ApiUrls";
import { useAuth } from "../providers/AuthProvider";
import { axiosCall } from "@/lib/axiosCall";

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(1, "Password is required"),
});

type loginDataType = {
  email: string;
  password: string;
};

//LOGIN FORM COMPONENT
function LoginForm() {
  const auth = useAuth();
  const navigate = useNavigate();

  const { isPending, error, status, mutateAsync } = useMutation({
    mutationFn: async (data: loginDataType) => {
      return axiosCall({
        method: "POST",
        urlPath: ApiUrls.auth.login,
        data: data,
      });
    },
    onError: (error) => {
      console.log("err", error);
    },
    onSuccess: (data) => {
      if (data?.user != null) {
        auth.login(data?.user);
        navigate("/");
      }
    },
  });

  const loginForm = useForm<zod.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmitHandler(data: zod.infer<typeof loginSchema>) {
    mutateAsync(data);
  }

  return (
    <>
      {status === "error" && <ServerErrorAlert errors={error} />}
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmitHandler)}>
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <InputField
                type="email"
                label="Email Address"
                placeholder="example@mail.com"
                field={field}
              />
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <InputField type="password" label="Password" field={field} />
            )}
          />
          <div className="mb-2 mt-6">
            <Button
              type="submit"
              className="w-full"
              variant="secondary"
              disabled={isPending}
            >
              <Mail className="mr-2 h-4 w-4" />
              {isPending ? "Authenticating..." : "Login with Email"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default LoginForm;
