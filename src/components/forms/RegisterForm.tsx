import * as zod from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
//IMPORT COMPONENTS
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";
import { InputField } from "./elements/form-elements";
import ServerErrorAlert from "../elements/ServerErrorAlert";
//IMPORT UTILS
import ApiUrls from "@/lib/ApiUrls";
import { useAuth } from "../providers/AuthProvider";
import { axiosCall } from "@/lib/axiosCall";
import TextSeperator from "../elements/text-seperator";
import SocialButtons from "../elements/SocialButtons";
import getServerErrorsArray from "@/lib/server-errors-handler";
import { ApiErrorRes } from "@/types/axios";

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
  const navigate = useNavigate();
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
      return axiosCall({
        method: "POST",
        urlPath: ApiUrls.auth.register,
        data: data,
        isAuthRoute: true,
      });
    },
    onError: (error: ApiErrorRes) => {
      const err = getServerErrorsArray(error);
      setServerError(err || []);
    },
    onSuccess: (data) => {
      if (data?.user != null) {
        auth.login(data?.user);
        navigate("/");
      }
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
