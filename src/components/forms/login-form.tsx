import { useState } from "react";

import useAuth from "@/hooks/use-auth";
import { ApiErrorRes } from "@/types/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import ServerErrorAlert from "../elements/server-error-alert";
import SocialButtons from "../elements/social-buttons";
import TextSeperator from "../elements/text-seperator";
import { InputField } from "./elements/form-elements";

import getServerErrorsArray from "@/lib/server-errors-handler";

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

  const { isPending, status, mutateAsync } = useMutation({
    mutationFn: async (data: loginDataType) => {
      return auth.login(data, `api/v1/login`);
    },
    onError(error: ApiErrorRes) {
      const er = getServerErrorsArray(error, true);
      setServerError(er || []);
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
