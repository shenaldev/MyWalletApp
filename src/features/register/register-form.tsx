import { useEffect, useState } from "react";

import useAuth from "@/hooks/use-auth";
import { ApiErrorRes } from "@/types/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import { InputField } from "@/components/form-elements";
import ServerErrorAlert from "@/components/ui-elements/server-error-alert";
import SocialButtons from "@/components/ui-elements/social-buttons";
import TextSeperator from "@/components/ui-elements/text-seperator";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";

import getServerErrorsArray from "@/lib/server-errors-handler";

const registerSchema = zod
  .object({
    full_name: zod.string().min(1, "Full name is required"),
    email: zod.string().email(),
    password: zod.string().min(8, "Password must be at least 8 characters"),
    confirm_password: zod.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirm_password;
    },
    {
      message: "Passwords do not match",
      path: ["confirm_password"],
    },
  );

type RegisterFormProps = {
  isMailVerified: boolean;
  onSubmit: (data: { email: string }) => void;
};

//REGISTER FORM COMPONENT
function RegisterForm({ isMailVerified, onSubmit }: RegisterFormProps) {
  const auth = useAuth();
  const [serverError, setServerError] = useState<string[] | null>(null);

  const registerForm = useForm<zod.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  //USER REGISTRATION MUTATION
  const { isPending, status, mutateAsync } = useMutation({
    mutationFn: async (data: any) => {
      return auth.register(data, `api/v1/register`);
    },
    onError: (error: ApiErrorRes) => {
      const err = getServerErrorsArray(error);
      setServerError(err || []);
    },
  });

  /**
   * Handle form submit event and call register mutation
   * @param data form data
   */
  async function onSubmitHandler(data: zod.infer<typeof registerSchema>) {
    const userData = {
      name: data.full_name,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirm_password,
    };
    if (!isMailVerified) {
      onSubmit({ email: data.email });
      return;
    }
    //CALL REGISTER MUTATION
    mutateAsync(userData);
  }

  //ON EMAIL VERIFICATION CREATE ACCOUNT
  useEffect(() => {
    if (isMailVerified) {
      registerForm.handleSubmit(onSubmitHandler)();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMailVerified]);

  return (
    <>
      {status === "error" && <ServerErrorAlert errors={serverError} />}
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(onSubmitHandler)}
          className="space-y-6 rounded-lg border bg-white p-8 shadow-md dark:bg-card"
        >
          <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
            Create an account
          </h2>
          <FormField
            control={registerForm.control}
            name="full_name"
            render={({ field }) => (
              <InputField
                label="Full Name"
                placeholder="Alen Jake"
                field={field}
              />
            )}
          />
          <FormField
            control={registerForm.control}
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
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <InputField type="password" label="Password" field={field} />
            )}
          />
          <FormField
            control={registerForm.control}
            name="confirm_password"
            render={({ field }) => (
              <InputField
                type="password"
                label="Confirm Password"
                field={field}
              />
            )}
          />

          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Signing up..." : "Sign up"}
          </Button>

          <TextSeperator text="or continue with" />
          <SocialButtons />
        </form>
      </Form>
    </>
  );
}

export default RegisterForm;
