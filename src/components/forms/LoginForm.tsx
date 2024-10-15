import * as zod from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
//IMPORT COMPONENTS
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import { InputField } from "./elements/form-elements";
import SocialButtons from "../elements/SocialButtons";
import TextSeperator from "../elements/text-seperator";
import ServerErrorAlert from "../elements/ServerErrorAlert";
//IMPORT HOOKS LIBS
import ApiUrls from "@/lib/ApiUrls";
import { axiosCall } from "@/lib/axiosCall";
import { useAuth } from "../providers/AuthProvider";
import getServerErrorsArray from "@/lib/server-errors-handler";
//IMPORT TYPES
import { ApiErrorRes } from "@/types/axios";

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
  const [serverError, setServerError] = useState<string[] | null>(null);
  const navigate = useNavigate();

  const { isPending, status, mutateAsync } = useMutation({
    mutationFn: async (data: loginDataType) => {
      return axiosCall({
        method: "POST",
        urlPath: ApiUrls.auth.login,
        data: data,
      });
    },
    onError(error: ApiErrorRes) {
      const er = getServerErrorsArray(error);
      setServerError(er);
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
      {status === "error" && (
        <ServerErrorAlert className="mb-4" errors={serverError} />
      )}
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmitHandler)}
          className="space-y-6 rounded-lg border bg-white p-8 shadow-md dark:bg-card"
        >
          <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
            Login to your account
          </h2>

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
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Authenticating..." : "Sign in"}
          </Button>

          <TextSeperator text="or continue with" />
          <SocialButtons />
        </form>
      </Form>
    </>
  );
}

export default LoginForm;
